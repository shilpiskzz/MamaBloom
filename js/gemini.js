// js/gemini.js

const API_KEY = "AIzaSyDXvOhc7r4uk_QNQKKG0AKqF1LKQDGxIaY";

async function getGeminiResponse() {
    const input = document.getElementById("userInput").value.trim();
    const responseArea = document.getElementById("responseArea");

    if (!input) {
        responseArea.textContent = "Please enter a question.";
        return;
    }

    responseArea.textContent = "Thinking...";

    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: input }] }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 512
                    }
                })
            }
        );

        const data = await res.json();
        console.log("Gemini response:", data);

        const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        responseArea.textContent = output || "Sorry, no response.";
    } catch (err) {
        console.error("Fetch error:", err);
        responseArea.textContent = "Something went wrong. Check console.";
    }
}
