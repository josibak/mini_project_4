// src/pages/BookEdit.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBookById, updateBook, deleteBook } from '../api/bookApi';

const BookEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBookById(id);
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        alert('도서 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await updateBook(id, { title, description, userId: user?.id });
      navigate('/my');
    } catch (error) {
      alert('수정 실패: ' + (error.response?.data?.message || '서버 오류'));
    }
  };

  const handleAICover = () => {
    navigate('/ai-cover', {
      state: { id: Number(id), title, description },
    });
  };

  // === 삭제 함수 추가 ===
  const handleDelete = async () => {
    if (!window.confirm("정말로 이 도서를 삭제하시겠습니까?")) return;
    try {
      await deleteBook(id);
      alert("도서가 성공적으로 삭제되었습니다.");
      navigate('/my');
    } catch (error) {
      alert('삭제 실패: ' + (error.response?.data?.message || '서버 오류'));
    }
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            {/* === 삭제 버튼 추가 === */}
            <button
              onClick={handleDelete}
              style={{
                flex: 1,
                background: '#ffbfcf',
                color: '#ff0033',
                border: 'none',
                borderRadius: 6,
                padding: '12px 0',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEdit;
