const axios = require("axios");
require("dotenv").config();

async function checkCompliance(content) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "meta-llama/llama-3-8b-instruct",
                messages: [
                    {
                        role: "system",
                        content: "You are a compliance checker. Check if content contains false claims, harmful content, or inappropriate tone. Reply with 'APPROVED' or 'REJECTED' and reason."
                    },
                    {
                        role: "user",
                        content: content
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

        const result = response.data.choices[0].message.content;

        if (result.includes("REJECTED")) {
            return "❌ Content rejected: " + result;
        }

        return content;

    } catch (error) {
        console.error("❌ Compliance Error:", error.message);
        return content; // fallback
    }
}

module.exports = checkCompliance;