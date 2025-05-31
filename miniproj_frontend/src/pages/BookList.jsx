import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockBooks from '../data/mockBooks';
import { fetchBooks } from '../api/bookApi';

const BookList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  // useEffect(() => {
  //   setBooks(mockBooks);
  //   // axios.get('/api/books').then(res => setBooks(res.data));
  // }, []);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        console.log("불러온 책 목록", data);
        setBooks(data);
      } catch (error) {
        console.error("도서 목록을 불러오는데 실패했습니다", error);
      }
    };

    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    [book.title, book.author, book.description].join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* 네비게이션 & 검색 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ddd', padding: '10px 20px' }}>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/home')}>홈</span>
        <h3 style={{ margin: 0 }}>도서 목록</h3>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/my')}>My</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <input
          placeholder="검색어 입력"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: 10, backgroundColor: '#ddd', width: 200 }}
        />
        <button onClick={() => setCurrentPage(1)} style={buttonStyle}>검색</button>
      </div>

      {/* 책 리스트 */}
      <div style={{ padding: '0 20px' }}>
        {currentBooks.map(book => (
          <div
            key={book.id}
            onClick={() => navigate(`/books/${book.id}`)}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', cursor: 'pointer' }}
          >
            <div style={coverStyle}>커버</div>
            <div style={{ marginLeft: '10px' }}>
              <div><strong>{book.title}</strong></div>
              <div>{book.author}</div>
              <div>{book.description}</div>
            </div>
          </div>
        ))}
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
};

export default BookList;
