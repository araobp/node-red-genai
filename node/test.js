const API_KEY = process.env.GOOGLE_AI_API_KEY;

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const test = async () => {
  const prompt = "Explain how AI works";
  
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

test();


