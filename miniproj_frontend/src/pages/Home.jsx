// src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/bookApi'; // ✅ 실제 API 호출 함수

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        // 최신순 정렬이 되어 있다고 가정하고 상위 3개만 추출
        const recentBooks = data.slice(0, 3);
        setBooks(recentBooks);
      } catch (error) {
        console.error('도서 목록 불러오기 실패:', error);
        alert('도서 목록을 불러오지 못했습니다.');
      }
    };

    loadBooks();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* 네비게이션 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#ddd',
          padding: '10px 20px',
        }}
      >
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => navigate('/home')}
        >
          홈
        </span>
        <h3 style={{ margin: 0 }}>작가의 산책</h3>
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => navigate('/my')}
        >
          My
        </span>
      </div>

      {/* 버튼 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          margin: '20px',
        }}
      >
        <button onClick={() => navigate('/books')} style={buttonStyle}>
          도서 목록
        </button>
        <button onClick={() => navigate('/create')} style={buttonStyle}>
          도서 추가
        </button>
      </div>

      {/* 새로운 책 3권 */}
      <div style={{ padding: '0 20px' }}>
        <h4>새로운 책</h4>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            backgroundColor: '#ddd',
            padding: '20px',
          }}
        >
          {books.length === 0 ? (
            <p>표시할 도서가 없습니다.</p>
          ) : (
            books.map((book) => (
              <div
                key={book.id}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '100px',
                }}
                onClick={() => navigate(`/books/${book.id}`)}
              >
                {/* 커버 이미지 또는 대체 UI */}
                <div style={coverStyle}>
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt="표지"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    <span style={{ color: 'white', fontWeight: 'bold' }}>
                      표지 없음
                    </span>
                  )}
                </div>
                <div style={{ marginTop: 8, fontWeight: 600 }}>
                  {book.title}
                </div>
                <div style={{ marginTop: 4, color: '#555' }}>
                  {book.author || '작가 미상'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#bfcfff',
  padding: '10px 20px',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
};

const coverStyle = {
  width: '100px',
  height: '150px',
  backgroundColor: '#f08080',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  boxShadow: '2px 2px 6px rgba(0,0,0,0.2)',
  overflow: 'hidden',
  borderRadius: 4,
};

export default Home;
