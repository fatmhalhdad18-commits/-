
import { GoogleGenAI, Type } from "@google/genai";
import { ChildAdvice, ConsultationData } from "../types";

export const getChildAdvice = async (data: ConsultationData): Promise<ChildAdvice> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Act as an expert pediatrician and child developmental psychologist. 
  A mother is asking for advice in Arabic. 
  Child's Age: ${data.age} ${data.ageUnit}
  Problem/Concern: ${data.problem}

  Provide compassionate, evidence-based, and practical advice.
  Ensure the tone is supportive and reassuring.
  ALL response fields MUST be in Arabic language.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.STRING,
            description: "A sympathetic overview of the situation in Arabic."
          },
          immediateSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "What to do right now in Arabic."
          },
          managementStrategies: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Long-term methods to deal with this in Arabic."
          },
          expertTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Professional insights for the mother in Arabic."
          },
          warningSigns: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Red flags indicating a doctor should be consulted in Arabic."
          }
        },
        required: ["summary", "immediateSteps", "managementStrategies", "expertTips", "warningSigns"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("لم يتم إنشاء نصيحة");
  
  return JSON.parse(text);
};
