import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function aiPrompt(message, role) {
  if (process.env.STAGE === "local") return "Currently in local stage";

  try {
    const response = await openai.chat.completions.create({
      messages: [{ role, content: message }],
      model: "gpt-3.5-turbo",
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export { aiPrompt };
