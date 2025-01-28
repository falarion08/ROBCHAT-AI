
export default async function getBotResponse(message:string){
    console.log(String(process.env.OPENROUTER_API_KEY));
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${String(process.env.OPENROUTER_API_KEY)}`,

                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "meta-llama/llama-3.2-3b-instruct:free",
                "messages": [
                    { "role": "system", "content": message },
                ],
            })
        });

      const completion = await response.json();
      return completion.choices[0].message;
}