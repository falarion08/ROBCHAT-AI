
"use server";
export const maxDuration = 60 // Max duration for GET or POST request is 60 seconds

export default async function getBotResponse(message:string){
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "meta-llama/llama-3.1-70b-instruct:free",
          "messages": [
            {
              "role": "system",
              "content": message
            }
          ]
        })
      });

      const completion = await response.json();
      
      return completion.choices[0].message.content;
}