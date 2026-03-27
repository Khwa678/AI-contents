const axios = require("axios");
require("dotenv").config();

async function distribute(content) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "meta-llama/llama-3-8b-instruct",
                messages: [
                    {
                        role: "system",
                        content: "Create a short engaging LinkedIn post from the given content."
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

        const linkedin = response.data.choices[0].message.content;

        return {
            linkedin
        };

    } catch (error) {
        console.error("❌ Distributor Error:", error.message);

        return {
            linkedin: content.slice(0, 100)
        };
    }
}

module.exports = distribute;