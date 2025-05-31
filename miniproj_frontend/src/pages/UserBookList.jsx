// src/pages/UserBookList.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/bookApi';

const UserBookList = () => {
  const navigate = useNavigate();
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(); // GET /api/books
        setUserBooks(data);
      } catch (error) {
        alert('도서 목록 불러오기 실패: ' + (error.response?.data?.message || '서버 오류'));
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

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
        <h3 style={{ margin: 0 }}>유저 도서 목록</h3>
        <span />
      </div>

      {/* 도서 리스트 */}
      <div style={{ width: '100%', padding: '32px 10vw', boxSizing: 'border-box' }}>
        {userBooks.length === 0 ? (
          <p>등록된 도서가 없습니다.</p>
        ) : (
          userBooks.map((book) => (
            <div key={book.id} style={cardStyle}>
              {/* 커버, 제목, 날짜 클릭 → BookDetail 이동 */}
              <div
                onClick={() => navigate(`/books/${book.id}`, { state: book })}
                style={{ display: 'flex', alignItems: 'center', flex: 1, cursor: 'pointer' }}
              >
                <div style={coverStyle}>
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt="cover"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ color: 'white', fontWeight: 'bold' }}>표지 없음</span>
                  )}
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <div>
                    <strong>{book.title}</strong>
                  </div>
                  <div>등록일: {book.createdAt?.split('T')[0] || 'N/A'}</div>
                  <div>최종 수정일: {book.updatedAt?.split('T')[0] || 'N/A'}</div>
                </div>
              </div>

              {/* 수정 버튼 */}
              <div>
                <span
                  style={{ color: 'blue', cursor: 'pointer', marginLeft: 10 }}
                  onClick={() => navigate(`/edit/${book.id}`, { state: book })}
                >
                  수정
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const cardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 8,
  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  padding: '10px',
  marginBottom: '15px',
};

const coverStyle = {
  width: '60px',
  height: '100px',
  backgroundColor: '#f08080',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: 4,
};

export default UserBookList;
