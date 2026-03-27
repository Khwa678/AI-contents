const axios = require("axios");
require("dotenv").config();

async function generateContent(input) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "meta-llama/llama-3-8b-instruct",
                messages: [
                    {
                        role: "user",
                        content: `Write a professional LinkedIn-style content about: ${input}`
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "AI ContentOps"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error("❌ OpenRouter ERROR:");
        console.error(error.response?.data || error.message);

        return "❌ Failed to generate content";
    }
}

module.exports = generateContent;