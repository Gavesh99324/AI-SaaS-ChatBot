/*

export const getAPIKey = (model) => {
    if (model === "gemini") {
      return process.env.GEMINI_SECRET_KEY; // Get the Gemini API key
    } else if (model === "deepseek") {
      return process.env.DEEPSEEK_SECRET_KEY; // Get the DeepSeek API key
    }
    throw new Error("Invalid model selected");
  };
  */


  // controllers/getAPIKey.js

  export function getAPIKey(model) {
    if (model === "gemini") {
      if (!process.env.GEMINI_SECRET_KEY) {
        throw new Error("GEMINI_SECRET_KEY is missing from environment variables");
      }
      return process.env.GEMINI_SECRET_KEY;
    }
  
    if (model === "deepseek") {
      if (!process.env.DEEPSEEK_SECRET_KEY) {
        throw new Error("DEEPSEEK_SECRET_KEY is missing from environment variables");
      }
      return process.env.DEEPSEEK_SECRET_KEY;
    }
  
    throw new Error("Invalid provider specified");
  }
  