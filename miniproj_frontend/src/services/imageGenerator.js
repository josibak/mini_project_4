export async function generateImageFromPrompt(
  apiKey,
  prompt,
  model = 'dall-e-3',
  quality = 'standard',
  style = 'vivid',
  size = '1024x1024' // 기본값 변경
) {
  // DALL-E 3 모델일 때만 지원 사이즈 사용
  if (model === 'dall-e-3' && !['1024x1024', '1024x1792', '1792x1024'].includes(size)) {
    size = '1024x1024';
  }

  const body = {
    model,
    prompt,
    n: 1,
    size,
    quality,
    style,
  };

  // DALL-E 2일 때는 quality, style 옵션 제거
  if (model === 'dall-e-2') {
    delete body.quality;
    delete body.style;
    // DALL-E 2는 '256x256', '512x512', '1024x1024'만 지원
    if (!['256x256', '512x512', '1024x1024'].includes(size)) {
      body.size = '512x512';
    }
  }

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message || 'OpenAI API 오류');
  }
  if (!data?.data?.[0]?.url) {
    throw new Error('이미지 URL이 응답에 없습니다.');
  }
  return data.data[0].url;
}
