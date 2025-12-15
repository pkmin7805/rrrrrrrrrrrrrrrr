import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Book } from '../types';

import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: apiKey });

// Define the schema for book responses
const bookSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "The title of the book.",
      },
      author: {
        type: Type.STRING,
        description: "The author of the book.",
      },
      description: {
        type: Type.STRING,
        description: "A short, engaging description of the book (approx 20-30 words).",
      },
      category: {
        type: Type.STRING,
        description: "The genre or category of the book.",
      },
      price: {
        type: Type.STRING,
        description: "Estimated price in KRW (e.g., 18,000원).",
      },
      rating: {
        type: Type.NUMBER,
        description: "Rating out of 5 (e.g., 4.5).",
      },
    },
    required: ["title", "author", "description", "category", "price", "rating"],
  },
};

export const fetchBookRecommendations = async (userQuery: string): Promise<Book[]> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are a knowledgeable and tasteful bookstore curator. 
    Your goal is to recommend books based on the user's mood, interests, or specific requests. 
    Ensure the recommendations are diverse and high-quality. 
    If the user's query is in Korean, provide descriptions in Korean. 
    If in English, provide in English.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: bookSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No data received from Gemini.");
    }

    const books: Book[] = JSON.parse(jsonText);
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};