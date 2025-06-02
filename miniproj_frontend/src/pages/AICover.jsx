import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateImageFromPrompt } from '../services/imageGenerator';
import { updateBook, createBook } from '../api/bookApi';

const AICover = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.state?.id || null;
  const title = location.state?.title || '';
  const description = location.state?.description || '';

  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [model, setModel] = useState('dall-e-3');
  const [quality, setQuality] = useState('standard');
  const [style, setStyle] = useState('vivid');

  const getUserId = () => {
    if (location.state?.userId) return location.state.userId;
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.userId || user?.id;
    } catch {
      return undefined;
    }
  };

  const handleGenerate = async () => {
    if (!apiKey || !prompt) {
      alert('API 키와 프롬프트를 모두 입력하세요.');
      return;
    }
    try {
      setLoading(true);
      const fullPrompt = `제목: ${title}\n내용: ${description}\n요청: ${prompt}`;
      const url = await generateImageFromPrompt(apiKey, fullPrompt, model, quality, style);
      setImageUrl(url);
    } catch (err) {
      alert('이미지 생성 실패');
      console.error('[이미지 생성 오류]', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const userId = getUserId();
    if (!userId) {
      alert('userId가 없습니다. 다시 로그인 해주세요.');
      return;
    }

    const bookData = {
      userId: Number(userId),
      title: String(title),
      description: String(description),
      coverImageUrl: imageUrl || null,
    };

    try {
      if (bookId) {
        await updateBook(bookId, bookData);
        alert('도서가 업데이트되었습니다.');
      } else {
        await createBook(bookData);
        alert('도서가 저장되었습니다.');
      }
      navigate('/my');
    } catch (error) {
      alert('도서 저장 실패: ' + (error.response?.data?.message || '서버 오류'));
    }
  };

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        backgroundColor: '#fff',
        minHeight: '100vh',
        overflowY: 'scroll', // ✅ 스크롤 항상 표시
      }}
    >
      {/* ✅ 통일된 상단 네비게이션 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 32px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #eee',
        }}
      >
        <span
          style={{ color: '#666', fontWeight: 500, cursor: 'pointer' }}
          onClick={() => navigate('/home')}
        >
          Home
        </span>
        <h3 style={{ margin: 0 }}>작가의 산책</h3>
        <span
          style={{ color: '#666', fontWeight: 500, cursor: 'pointer' }}
          onClick={() => navigate('/my')}
        >
          My
        </span>
      </div>

      {/* 본문 */}
      <div style={{ maxWidth: '720px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontWeight: 700, fontSize: '32px', marginBottom: '32px' }}>AI Book Cover</h2>

        <label style={labelStyle}>API Key</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="*****"
          style={inputStyle}
        />

        <label style={labelStyle}>Book Info</label>
        <div style={infoBoxStyle}>
          <div>
            <strong>제목:</strong> {title}
          </div>
          <div>
            <strong>내용:</strong> {description}
          </div>
        </div>

        <label style={labelStyle}>옵션</label>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <select value={model} onChange={(e) => setModel(e.target.value)} style={selectStyle}>
            <option value="dall-e-2">DALL·E 2</option>
            <option value="dall-e-3">DALL·E 3</option>
          </select>
          <select value={quality} onChange={(e) => setQuality(e.target.value)} style={selectStyle}>
            <option value="standard">Standard</option>
            <option value="hd">HD</option>
          </select>
          <select value={style} onChange={(e) => setStyle(e.target.value)} style={selectStyle}>
            <option value="vivid">Vivid</option>
            <option value="natural">Natural</option>
          </select>
        </div>

        <label style={labelStyle}>Prompt</label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="표지를 묘사하는 프롬프트를 입력하세요"
          style={inputStyle}
        />

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={handleGenerate} disabled={loading} style={buttonStyle}>
            {loading ? '생성 중...' : '표지 생성'}
          </button>
        </div>

        <div style={previewStyle}>
          {imageUrl ? (
            <img src={imageUrl} alt="cover" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          ) : (
            <span style={{ color: '#777' }}>{loading ? '생성 중...' : '<표지 없음>'}</span>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={handleSave} style={buttonStyle}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

// 스타일 정의
const labelStyle = {
  display: 'block',
  fontSize: '14px',
  marginBottom: '8px',
  fontWeight: 600,
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  fontSize: '16px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginBottom: '24px',
  boxSizing: 'border-box',
};

const selectStyle = {
  flex: 1,
  padding: '10px',
  fontSize: '14px',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const infoBoxStyle = {
  backgroundColor: '#f3f3f3',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '24px',
  lineHeight: '1.5',
};

const previewStyle = {
  backgroundColor: '#f5f5f5',
  minHeight: '200px',
  marginTop: '24px',
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonStyle = {
  minWidth: '140px',
  height: '48px',
  backgroundColor: '#111',
  color: '#fff',
  borderRadius: '999px',
  border: 'none',
  fontWeight: 600,
  fontSize: '16px',
  cursor: 'pointer',
};

export default AICover;
