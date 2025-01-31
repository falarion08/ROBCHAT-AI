
"use server";
export default async function getBotResponse(message:string){
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "meta-llama/llama-3.2-3b-instruct:free",
          "messages": [
            {
              "role": "system",
              "content": message
            }
          ]
        })
      });

      const completion = await response.json();
      console.log(message)
      
      return completion.choices[0].message.content;
}