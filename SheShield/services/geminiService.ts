
import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client using the mandatory environment variable process.env.API_KEY
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getSelfDefenseAdvice = async (scenario: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Give me 3 concise, actionable self-defense tips for this scenario: ${scenario}. Focus on escape and immediate safety for a woman.`,
  });
  return response.text;
};

export const getNearbySafeZones = async (lat: number, lng: number) => {
  const ai = getAIClient();
  // Using Gemini 2.5 series model as it is required for Google Maps grounding
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Locate the nearest verified safe locations (Police Stations and Hospitals) to these coordinates: Lat ${lat}, Lng ${lng}. Provide names, street addresses, and approximate distances if available.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      }
    },
  });

  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

// Provides AI-driven skincare routines based on skin profile
export const getSkincareAdvice = async (skinType: string, skinConcern: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an AI skincare expert, provide a concise and actionable morning and evening skincare routine for someone with ${skinType} skin and a top concern of ${skinConcern}.`,
  });
  return response.text;
};

// Provides wellness tips tailored to the specific day of a user's menstrual cycle
export const getHealthTips = async (day: number) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a short, supportive, and actionable wellness or health tip for a woman on day ${day} of her menstrual cycle.`,
  });
  return response.text;
};
