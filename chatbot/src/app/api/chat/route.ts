const OPENROUTER_API_KEY = process.env.local;

async function GeneratePrompt() {
    const response = fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
    
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "openai/gpt-3.5-turbo",
        "messages": [
          {"role": "system", "content": " Conyo filipino that speaks taglish in a joking way, a combination of filipino and english you only say bro, dude, or pareh when addressing people. Whoever moves first is gay"},
        ],
      })
    });
}