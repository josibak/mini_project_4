import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/bookApi';

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        const recentBooks = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setBooks(recentBooks);
      } catch (error) {
        console.error('도서 목록 불러오기 실패:', error);
        alert('도서 목록을 불러오지 못했습니다.');
      }
    };

    loadBooks();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      {/* 네비게이션 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #eee'
      }}>
        <span style={{ color: '#666', fontWeight: 500, cursor: 'pointer' }} onClick={() => navigate('/home')}>
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

      {/* 메인 콘텐츠 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        paddingTop: '100px',
        paddingBottom: '80px',
      }}>
        {/* 버튼 */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          marginBottom: '100px', // ✅ 버튼 아래 여백 확대
          marginTop: '20px'
        }}>
          <button onClick={() => navigate('/books')} style={menuButtonStyle}>
            Book List
          </button>
          <button onClick={() => navigate('/create')} style={menuButtonStyle}>
            Book Create
          </button>
        </div>

        {/* 도서 카드 목록 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          width: '100%',
          padding: '0 32px',
        }}>
          {books.length === 0 ? (
            <p>표시할 도서가 없습니다.</p>
          ) : (
            books.map((book) => (
              <div
                key={book.id}
                style={{
                  width: '240px',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '180px',
                    backgroundColor: '#cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/books/${book.id}`)}
                >
                  {book.coverImageUrl ? (
                    <img
                      src={book.coverImageUrl}
                      alt="cover"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ color: '#fff' }}>No Image</span>
                  )}
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '6px' }}>{book.title}</div>
                  <div style={{ color: '#888', fontSize: '15px', marginBottom: '14px' }}>
                    {book.username || 'username'}
                  </div>
                  <button
                    onClick={() => navigate(`/books/${book.id}`)}
                    style={{
                      backgroundColor: '#111',
                      color: '#fff',
                      padding: '8px 20px',
                      borderRadius: '20px',
                      border: 'none',
                      fontSize: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    view
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// 더 크게 조정된 메뉴 버튼 스타일
const menuButtonStyle = {
  width: '200px',
  height: '56px',
  backgroundColor: '#111',
  color: '#fff',
  borderRadius: '999px',
  border: 'none',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default Home;
