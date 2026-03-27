const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const generateContent = require("./agents/generator");
const checkCompliance = require("./agents/compliance");
const localize = require("./agents/localizer");
const distribute = require("./agents/distributor");

app.post("/process", async (req, res) => {
    try {
        const { input } = req.body;

        console.log("Input:", input);

        let content = await generateContent(input);
        console.log("Generated:", content);

        content = await checkCompliance(content);

        const localized = await localize(content);

        const finalOutput = await distribute(localized.english);

        res.json({
            generated: content,
            localized,
            finalOutput
        });

    } catch (err) {
        console.error("SERVER ERROR:", err);
        res.status(500).json({ error: "Server failed" });
    }
});

// ✅ ADD THIS (you forgot earlier)
app.listen(5000, () => {
    console.log("Server running on port 5000");
});