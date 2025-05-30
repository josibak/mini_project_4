import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockBooks from '../data/mockBooks';
// import axios from 'axios'; // ✅ 실제 API 연결 시 사용

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(mockBooks.slice(0, 3)); // 최근 3권
    // axios.get('/api/books/latest').then(res => setBooks(res.data));
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ddd', padding: '10px 20px' }}>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/home')}>홈</span>
        <h3 style={{ margin: 0 }}>작가의 산책</h3>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/my')}>My</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px' }}>
        <button onClick={() => navigate('/books')} style={buttonStyle}>도서 목록</button>
        <button onClick={() => navigate('/create')} style={buttonStyle}>도서 추가</button>
      </div>

      <div style={{ padding: '0 20px' }}>
        <h4>새로운 책</h4>
        <div style={{ display: 'flex', gap: '20px', backgroundColor: '#ddd', padding: '20px' }}>
          {books.map(book => (
            <div
              key={book.id}
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <div style={coverStyle}>표지</div>
              <div>{book.title}</div>
              <div>{book.author}</div>
            </div>
          ))}
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
  cursor: 'pointer'
};

const coverStyle = {
  width: '60px',
  height: '100px',
  backgroundColor: '#f08080',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px auto',
  boxShadow: '2px 2px 6px rgba(0,0,0,0.2)'
};

export default Home;
