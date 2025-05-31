// // src/services/imageGenerator.js
// export async function generateImageFromPrompt(apiKey, prompt) {
//   const res = await fetch('https://api.openai.com/v1/images/generations', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       model: 'dall-e-2',
//       prompt,
//       n: 1,
//       size: '256x256',
//     }),
//   });

//   const data = await res.json();
//   return data.data[0].url;
// }

// src/services/imageGenerator.js
export async function generateImageFromPrompt(apiKey, prompt, model = 'dall-e-2', quality = 'standard', style = 'vivid') {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,              // ex: 'dall-e-3'
      prompt,
      n: 1,
      size: '512x512',    // 고정 크기 or 옵션화 가능
      quality,            // ex: 'standard' or 'hd' (if using dall-e-3)
      style               // ex: 'vivid' or 'natural'
    }),
  });s

  const data = await res.json();
  if (!data?.data?.[0]?.url) {
    throw new Error('이미지 URL이 응답에 없습니다.');
  }
  return data.data[0].url;
}
