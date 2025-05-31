import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../api/bookApi';

const BookCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const saveBook = () => {
    const userBooks = JSON.parse(localStorage.getItem('userBooks') || '[]');
    const newId = userBooks.length > 0 ? Math.max(...userBooks.map(b => b.id)) + 1 : 1;

    const newBook = {
      id: newId,
      title,
      content,
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0],
    };

    const updatedBooks = [...userBooks, newBook];
    localStorage.setItem('userBooks', JSON.stringify(updatedBooks));

    return newBook;
  };

  const handleAICover = () => {
    const created = saveBook();
    navigate('/ai-cover', {
      state: {
        id: created.id,
        title: created.title,
        content: created.content,
      }
    });
  };

  const handleSave = async() => {
    try {
      const created = await createBook({title, content});
      navigate('/my');
    } catch (error) {
      
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>
      {/* 상단 네비 */}
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
        >홈</span>
        <h3 style={{ margin: 0 }}>도서 추가</h3>
        <span
          style={{ color: 'blue', cursor: 'pointer', fontWeight: 600 }}
          onClick={() => navigate('/my')}
        >My</span>
      </div>

      {/* 본문 */}
      <div
        style={{
          width: '100%',
          padding: '32px 10vw',
          boxSizing: 'border-box',
        }}
      >
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
          <div style={{ marginBottom: 20 }}>
            <div style={{ background: '#ddd', padding: 8, fontWeight: 600, marginBottom: 8 }}>1. 책 제목</div>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
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
          <div style={{ marginBottom: 32 }}>
            <div style={{ background: '#ddd', padding: 8, fontWeight: 600, marginBottom: 8 }}>2. 내용</div>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
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

export default BookCreate;