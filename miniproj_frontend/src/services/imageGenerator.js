// src/services/imageGenerator.js
export async function generateImageFromPrompt(apiKey, prompt) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'dall-e-2',
      prompt,
      n: 1,
      size: '256x256',
    }),
  });

  const data = await res.json();
  return data.data[0].url;
}
