const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function optimizePrompt(originalPrompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const systemInstruction = `
You are a sustainability-focused prompt optimizer.

Rewrite the prompt to:
- Preserve its core objective
- Remove redundant, wasteful, or unnecessary instructions
- Eliminate verbosity
- Make it concise and efficient
- Improve clarity

Important:
Do NOT keep instructions that increase length unnecessarily.
Return ONLY the optimized prompt.
`;


  const result = await model.generateContent(
    systemInstruction + "\n\nOriginal Prompt:\n" + originalPrompt
  );

  const response = await result.response;
  return response.text().trim();
}

module.exports = optimizePrompt;
