// src/pages/BookEdit.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBookById, updateBook } from '../api/bookApi';

const BookEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBookById(id);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        alert('도서 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  // 저장
  const handleSave = async () => {
    try {
      await updateBook(id, { title, content });
      navigate('/my');
    } catch (error) {
      alert('수정 실패: ' + (error.response?.data?.message || '서버 오류'));
    }
  };

  // AI 커버 생성 페이지로 이동 (id, title, content 전달)
  const handleAICover = () => {
    navigate('/ai-cover', {
      state: { id: Number(id), title, content },
    });
  };

  if (loading) return <p style={{ padding: 20 }}>로딩 중...</p>;

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>
      {/* 상단 네비게이션 */}
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
        <h3 style={{ margin: 0 }}>도서 수정</h3>
        <span
          style={{ color: 'blue', cursor: 'pointer', fontWeight: 600 }}
          onClick={() => navigate('/my')}
        >
          My
        </span>
      </div>

      {/* 입력 폼 */}
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
          {/* 1. 책 제목 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ background: '#ddd', padding: 8, fontWeight: 600, marginBottom: 8 }}>
              1. 책 제목
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="책 제목을 입력하세요"
              style={{
                width: '100%',
                padding: 12,
                background: '#aea7a7',
                border: 'none',
                borderRadius: 4,
                color: '#222',
                fontSize: 16,
                marginBottom: 8,
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* 2. 내용 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ background: '#ddd', padding: 8, fontWeight: 600, marginBottom: 8 }}>
              2. 내용
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="책 내용을 입력하세요"
              style={{
                width: '100%',
                minHeight: 120,
                background: '#aea7a7',
                border: 'none',
                borderRadius: 4,
                color: '#222',
                padding: 12,
                fontSize: 16,
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* 3. 버튼들 */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={handleAICover}
              style={{
                flex: 1,
                background: '#bfcfff',
                color: '#0070ff',
                border: 'none',
                borderRadius: 6,
                padding: '12px 0',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              AI 커버 생성
            </button>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                background: '#bfcfff',
                color: '#0070ff',
                border: 'none',
                borderRadius: 6,
                padding: '12px 0',
                fontWeight: 700,
                fontSize: 16,
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

export default BookEdit;
