import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { generateImageFromPrompt } from '../services/imageGenerator';

const AICover = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 구조 안전하게 추출
  const title = location.state?.title || '제목 없음';
  const bookId = location.state?.id;
  const content = location.state?.content || '';

  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!apiKey || !prompt) {
      alert('API 키와 프롬프트를 모두 입력하세요.');
      return;
    }

    try {
      setLoading(true);
      const url = await generateImageFromPrompt(apiKey, prompt);
      setImageUrl(url);
    } catch (err) {
      alert('이미지 생성 실패');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!bookId || !imageUrl) {
      alert('도서 정보 또는 생성된 이미지가 없습니다.');
      return;
    }

    const userBooks = JSON.parse(localStorage.getItem('userBooks') || '[]');
    const updated = userBooks.map(b =>
      b.id === bookId ? { ...b, cover: imageUrl } : b
    );
    localStorage.setItem('userBooks', JSON.stringify(updated));
    navigate('/my');

    /*
    const token = localStorage.getItem('token');
    axios.put(`/api/books/${bookId}`, { cover: imageUrl }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => navigate('/my'));
    */
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* 네비게이션 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#ddd',
        padding: '10px 20px'
      }}>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/home')}>홈</span>
        <h3 style={{ margin: 0 }}>AI 북커버 생성</h3>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/my')}>My</span>
      </div>

      <div style={{ padding: 20, textAlign: 'center' }}>
        <input
          placeholder="api 키 입력 창"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          style={inputStyle}
        />

        <div style={{ marginTop: 10 }}><strong>{title}</strong></div>

        <div style={{ marginTop: 10 }}>
          <input
            placeholder="프롬프트 입력창"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleGenerate} style={buttonStyle}>생성</button>
        </div>

        <div style={{ ...coverStyle, margin: '30px auto' }}>
          {loading ? '생성 중...' : imageUrl ? (
            <img
              src={imageUrl}
              alt="커버"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : '커버'}
        </div>

        <button onClick={handleSave} style={{ ...buttonStyle, width: 200 }}>저장</button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: 200,
  padding: 10,
  margin: '10px',
  backgroundColor: '#ddd',
  border: 'none',
};

const buttonStyle = {
  backgroundColor: '#bfcfff',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
};

const coverStyle = {
  width: '150px',
  height: '200px',
  backgroundColor: '#f08080',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default AICover;
