// src/pages/BookList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/bookApi';

const BookList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

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
    [book.title, book.author, book.description]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* 네비게이션 & 검색 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ddd', padding: '10px 20px' }}>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/home')}>
          홈
        </span>
        <h3 style={{ margin: 0 }}>도서 목록</h3>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/my')}>
          My
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <input
          placeholder="검색어 입력"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{ padding: 10, backgroundColor: '#ddd', width: 200 }}
        />
        <button onClick={() => setCurrentPage(1)} style={buttonStyle}>
          검색
        </button>
      </div>

      {/* 책 리스트 */}
      <div style={{ padding: '0 20px' }}>
        {currentBooks.length === 0 ? (
          <p style={{ textAlign: 'center' }}>검색 결과가 없습니다.</p>
        ) : (
          currentBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => navigate(`/books/${book.id}`)}
              style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', cursor: 'pointer' }}
            >
              {/* 커버 이미지 또는 대체 UI */}
              <div style={coverStyle}>
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt="커버"
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
                <div>{book.author || '작가 정보 없음'}</div>
                <div>{book.description || '설명 없음'}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              backgroundColor: currentPage === i + 1 ? '#bfcfff' : '#eee',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#bfcfff',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
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

export default BookList;
