import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/bookApi';

const BookList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error('도서 목록을 불러오는데 실패했습니다', error);
        alert('도서 목록을 불러오는데 실패했습니다');
      }
    };
    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    [book.title, book.username, book.description]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div style={{
      fontFamily: 'sans-serif',
      backgroundColor: '#fff',
      minHeight: '100vh',
      overflowY: 'scroll',
      paddingBottom: '120px'  // 페이지네이션 버튼 영역 확보
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

      {/* 검색창 */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '60px 0 40px', gap: '10px' }}>
        <input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '440px',
            padding: '14px 22px',
            border: '1px solid #aaa',
            borderRadius: '20px',
            outline: 'none',
            fontSize: '15px',
          }}
        />
        <button
          onClick={() => setCurrentPage(1)}
          style={{
            backgroundColor: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            padding: '0 18px',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          →
        </button>
      </div>

      {/* Book List */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ fontWeight: '600', marginBottom: '20px', fontSize: '24px' }}>Book List</h2>

        <div style={{
          borderRadius: '12px',
          backgroundColor: '#f5f5f5',
          padding: '24px',
        }}>
          {/* 헤더 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: '600',
            marginBottom: '16px',
            paddingBottom: '6px',
            fontSize: '16px',
            borderBottom: '1px solid #ddd'
          }}>
            <span>Title</span>
            <span>username</span>
          </div>

          {/* 도서 목록 */}
          {currentBooks.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '20px' }}>검색 결과가 없습니다.</p>
          ) : (
            currentBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => navigate(`/books/${book.id}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#e5e7eb',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  marginBottom: '14px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div style={coverStyle}>
                    {book.coverImageUrl ? (
                      <img
                        src={book.coverImageUrl}
                        alt="cover"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ color: '#fff' }}>img</span>
                    )}
                  </div>
                  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{book.title}</span>
                </div>
                <div style={{ fontSize: '15px', color: '#555' }}>
                  {book.username || 'name'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 페이지네이션 - 하단 고정 */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: '#fff',
        borderTop: '1px solid #eee',
        padding: '16px 0',
        textAlign: 'center',
        zIndex: 1000
      }}>
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
  );
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

export default BookList;
