

// install @google/generative-ai 
// by npm install @google/generative-ai

// get this code from the gemini website

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
}  from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
 // 🔐 Replace with environment variable in production

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig,
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW,
      },
    ],
  });

  const response = await result.response;
  const text = response.text();
  console.log("Gemini says:", text);

  return response.text();
}

export default runChat;


