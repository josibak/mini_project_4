import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/bookApi';

const UserBookList = () => {
  const navigate = useNavigate();
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.userId;

        if (!userId) {
          alert('로그인이 필요합니다.');
          navigate('/login');
          return;
        }

        const filtered = data.filter((book) => book.userId === userId);
        setUserBooks(filtered);
      } catch (error) {
        alert('도서 목록 불러오기 실패: ' + (error.response?.data?.message || '서버 오류'));
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [navigate]);

  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = userBooks.slice(startIndex, startIndex + booksPerPage);
  const totalPages = Math.ceil(userBooks.length / booksPerPage);

  if (loading) return <p style={{ padding: 20 }}>로딩 중...</p>;

  return (
    <div style={{
      fontFamily: 'sans-serif',
      backgroundColor: '#fff',
      minHeight: '100vh',
      overflowY: 'scroll',
    }}>
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
        <span style={{ color: '#666', fontWeight: 500, cursor: 'pointer' }} onClick={() => navigate('/my')}>
          My
        </span>
      </div>

      {/* 본문 영역 */}
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontWeight: 700, fontSize: '24px', marginBottom: '24px' }}>User Book List</h2>

        {/* 헤더 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 600,
          backgroundColor: '#f5f5f5',
          padding: '12px 20px',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          borderBottom: '1px solid #ddd',
        }}>
          <span>Title</span>
          <span></span>
        </div>

        {/* 도서 리스트 */}
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
          minHeight: '380px', // ⭐ 고정 높이 추가
        }}>
          {currentBooks.length === 0 ? (
            <p style={{ textAlign: 'center' }}>등록된 도서가 없습니다.</p>
          ) : (
            currentBooks.map((book) => (
              <div key={book.id} style={bookRowStyle}>
                <div
                  onClick={() => navigate(`/books/${book.id}`, { state: book })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={coverStyle}>
                    {book.coverImageUrl ? (
                      <img
                        src={book.coverImageUrl}
                        alt="cover"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ color: '#fff', fontSize: '12px' }}>img</span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{book.title}</div>
                    <div style={{ fontSize: '14px', color: '#777' }}>
                      {book.username || 'name'}
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      color: '#0070ff',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                    onClick={() => navigate(`/edit/${book.id}`, { state: book })}
                  >
                    Edit
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 페이지네이션 */}
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                margin: '0 4px',
                padding: '6px 12px',
                borderRadius: '50%',
                backgroundColor: currentPage === i + 1 ? '#111' : '#eee',
                color: currentPage === i + 1 ? '#fff' : '#000',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const bookRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#e5e7eb',
  padding: '12px 16px',
  borderRadius: '8px',
  marginBottom: '12px',
};

const coverStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '8px',
  backgroundColor: '#9ca3af',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  color: '#fff',
  flexShrink: 0,
};

export default UserBookList;
