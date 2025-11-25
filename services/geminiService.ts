import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from the environment
// Note: This will be used in future steps when AI features are requested.
// Ensure process.env.API_KEY is available in your runtime environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Placeholder for a future function to analyze market data using Gemini.
 * This structure is prepared for when you add detailed instructions.
 */
export const analyzeMarketSentiment = async (newsText: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      console.warn("API Key not found. Returning mock data.");
      return "Market sentiment analysis unavailable without API key.";
    }

    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: model,
      contents: `Analyze the sentiment of this financial text: ${newsText}`,
    });
    
    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
