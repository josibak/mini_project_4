// src/pages/AICover.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateImageFromPrompt } from '../services/imageGenerator';
import { updateBook } from '../api/bookApi';

const AICover = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const title = location.state?.title || '제목 없음';
  const bookId = location.state?.id;
  const description = location.state?.description || ''; // ✅ 변수명 변경

  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [model, setModel] = useState('dall-e-3');
  const [quality, setQuality] = useState('standard');
  const [style, setStyle] = useState('vivid');

  const handleGenerate = async () => {
    if (!apiKey || !prompt) {
      alert('API 키와 프롬프트를 모두 입력하세요.');
      return;
    }

    try {
      setLoading(true);
      const fullPrompt = `제목: ${title}\n내용: ${description}\n요청: ${prompt}`; // ✅ 내용 출력도 변경
      const url = await generateImageFromPrompt(apiKey, fullPrompt, model, quality, style);
      setImageUrl(url);
    } catch (err) {
      alert('이미지 생성 실패');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!bookId) {
      alert('도서 ID가 없습니다.');
      return;
    }

    try {
      await updateBook(bookId, { coverImageUrl: imageUrl || null });
      navigate('/my');
    } catch (error) {
      alert('커버 저장 실패');
      console.error(error);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#ddd',
          padding: '10px 20px',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <span
          style={{ color: 'blue', cursor: 'pointer', fontWeight: 600 }}
          onClick={() => navigate('/home')}
        >
          홈
        </span>
        <h3 style={{ margin: 0 }}>AI 북커버 생성</h3>
        <span
          style={{ color: 'blue', cursor: 'pointer', fontWeight: 600 }}
          onClick={() => navigate('/my')}
        >
          My
        </span>
      </div>

      <div style={{ width: '100%', padding: '32px 10vw', boxSizing: 'border-box' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
            width: '100%',
            padding: '32px 24px',
            boxSizing: 'border-box',
          }}
        >
          {/* 1. API 키 입력 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ background: '#ddd', padding: 8, fontWeight: 600, marginBottom: 8 }}>
              1. OpenAI API 키
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="API 키를 입력하세요"
              style={{
                width: '100%',
                padding: 12,
                background: '#eee',
                border: '1px solid #ccc',
                borderRadius: 4,
                fontSize: 16,
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* 2. 도서 정보 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ background: '#ddd', padding: 8, fontWeight: 600 }}>2. 도서 정보</div>
            <div style={{ padding: 12, background: '#f5f5f5', borderRadius: 4 }}>
              <div><strong>제목:</strong> {title}</div>
              <div style={{ marginTop: 4 }}><strong>내용:</strong> {description}</div> {/* ✅ 출력 수정 */}
            </div>
          </div>

          {/* 3. 옵션 선택 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ background: '#ddd', padding: 8, fontWeight: 600, marginBottom: 8 }}>
              3. 옵션 선택
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 100 }}>
                <label>모델</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 8,
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="dall-e-2">DALL·E 2</option>
                  <option value="dall-e-3">DALL·E 3</option>
                </select>
              </div>
              <div style={{ flex: 1, minWidth: 100 }}>
                <label>품질</label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 8,
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="standard">Standard</option>
                  <option value="hd">HD</option>
                </select>
              </div>
              <div style={{ flex: 1, minWidth: 100 }}>
                <label>스타일</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 8,
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="vivid">Vivid</option>
                  <option value="natural">Natural</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. 프롬프트 입력 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ background: '#ddd', padding: 8, fontWeight: 600, marginBottom: 8 }}>
              4. 프롬프트 입력
            </div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="표지를 묘사하는 프롬프트를 입력하세요"
              style={{
                width: '100%',
                padding: 12,
                background: '#eee',
                border: '1px solid #ccc',
                borderRadius: 4,
                fontSize: 16,
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* 5. 생성 버튼 */}
          <div style={{ marginBottom: 20, textAlign: 'center' }}>
            <button
              onClick={handleGenerate}
              disabled={loading}
              style={{
                background: '#bfcfff',
                padding: '12px 24px',
                border: 'none',
                borderRadius: 6,
                fontSize: 16,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
              }}
            >
              {loading ? '생성 중...' : '표지 생성'}
            </button>
          </div>

          {/* 6. 미리보기 */}
          <div
            style={{
              background: '#f5f5f5',
              borderRadius: 4,
              padding: 20,
              minHeight: 220,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="생성된 커버" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            ) : (
              <span style={{ color: '#777', fontSize: 16 }}>
                {loading ? '생성 중...' : '<표지 없음>'}
              </span>
            )}
          </div>

          {/* 7. 저장 버튼 */}
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <button
              onClick={handleSave}
              style={{
                background: '#bfcfff',
                padding: '12px 24px',
                border: 'none',
                borderRadius: 6,
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICover;
