import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TrendItem, VideoIdea, VideoMetadata, FullScript } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-3-flash-preview';

export const GeminiService = {
  /**
   * Finds trending topics using Google Search Grounding
   */
  async getTrends(niche: string): Promise<TrendItem[]> {
    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `Find 5 currently trending topics, news, or viral discussions related to "${niche}" on YouTube or the web right now. 
        Focus on things that would make good YouTube video subjects. 
        Return a simple list with a brief explanation of why it's trending.`,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are a YouTube trend analyst. You identify high-potential topics for content creators.",
        },
      });

      const trends: TrendItem[] = [];
      const text = response.text || "";
      
      // Parse the grounding chunks to get sources
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      // We will structure the text output manually since we can't use JSON schema with search tools easily combined with dynamic chunks in one go nicely without complex parsing
      // For this app, we will parse the text response loosely or ask for a specific format in text.
      // Let's assume the model returns a list. We will wrap the raw text for now, but to make it structured, 
      // let's try a second pass or just use the text. To keep it simple and robust, we'll return the text 
      // structured as a single "Report" or try to parse lines.
      
      // Let's just return the raw text analysis with the sources attached to the first item for simplicity in display,
      // or map them if possible. 
      // A better approach for the App UI is to just display the AI's analysis text and render the sources at the bottom.
      // However, to fit the `TrendItem` interface, let's map the text.
      
      return [{
        topic: `Trend Report for ${niche}`,
        relevance: text,
        sourceUrl: groundingChunks[0]?.web?.uri,
        sourceTitle: groundingChunks[0]?.web?.title
      }];

    } catch (error) {
      console.error("Error fetching trends:", error);
      throw error;
    }
  },

  /**
   * Generates Video Ideas based on a niche or trend
   */
  async generateIdeas(topic: string): Promise<VideoIdea[]> {
    const schema: Schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Catchy video title" },
          hook: { type: Type.STRING, description: "The opening hook concept" },
          viralScore: { type: Type.NUMBER, description: "Predicted viral potential 1-100" },
          targetAudience: { type: Type.STRING, description: "Who this video is for" }
        },
        required: ["title", "hook", "viralScore", "targetAudience"]
      }
    };

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Generate 5 high-potential YouTube video ideas for the topic: "${topic}". 
      Make them click-worthy and engaging.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "You are a world-class YouTube strategist like MrBeast's producer.",
      },
    });

    const jsonText = response.text || "[]";
    return JSON.parse(jsonText) as VideoIdea[];
  },

  /**
   * Writes a script for a video
   */
  async generateScript(idea: string, tone: string): Promise<FullScript> {
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        sections: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              heading: { type: Type.STRING },
              content: { type: Type.STRING },
              duration: { type: Type.STRING }
            },
            required: ["heading", "content", "duration"]
          }
        }
      },
      required: ["title", "sections"]
    };

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Write a complete YouTube video script for a video about: "${idea}". 
      Tone: ${tone}. 
      Structure it with an Intro, 3 Main Body points, and a Conclusion/CTA.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "You are a professional YouTube scriptwriter skilled in retention and storytelling.",
      },
    });

    return JSON.parse(response.text || "{}") as FullScript;
  },

  /**
   * Optimizes metadata (Titles, Desc, Tags)
   */
  async optimizeMetadata(context: string): Promise<VideoMetadata> {
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        titles: { type: Type.ARRAY, items: { type: Type.STRING } },
        description: { type: Type.STRING },
        tags: { type: Type.ARRAY, items: { type: Type.STRING } },
        thumbnailPrompt: { type: Type.STRING }
      },
      required: ["titles", "description", "tags", "thumbnailPrompt"]
    };

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Create optimized metadata for this video concept/script: "${context}".
      Provide 3 alternative clickbait but honest titles.
      Write a SEO-friendly description (first 2 lines are crucial).
      Provide 15 comma-separated tags.
      Describe a high-CTR thumbnail image concept.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "You are a YouTube SEO expert.",
      },
    });

    return JSON.parse(response.text || "{}") as VideoMetadata;
  }
};
