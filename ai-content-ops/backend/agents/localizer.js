const axios = require("axios");
require("dotenv").config();

async function localize(content) {
    try {
        const shortContent = content.slice(0, 800); // smaller = cleaner

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "meta-llama/llama-3-8b-instruct",
                messages: [
                    {
                        role: "system",
                        content: "Translate the given English text into clean, simple Hindi. Output ONLY Hindi text. No symbols, no English, no extra formatting."
                    },
                    {
                        role: "user",
                        content: shortContent
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

        let hindi = response.data.choices[0].message.content;

        // 🧹 STRONG CLEANING
        hindi = hindi
            .replace(/<[^>]*>/g, "")   // remove tags like <start_header_id>
            .replace(/[^\u0900-\u097F\s.,!?]/g, "") // keep only Hindi chars
            .trim();

        return {
            english: content,
            hindi: hindi || "❌ Translation issue"
        };

    } catch (error) {
        console.error("❌ Localization Error:", error.response?.data || error.message);

        return {
            english: content,
            hindi: "❌ Translation failed"
        };
    }
}

module.exports = localize;