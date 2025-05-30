import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  // 임시 데이터 (API 연결 전용)
  useEffect(() => {
    // TODO: 실제 API 연결되면 아래 axios 요청으로 교체
    // axios.get('/api/books/latest').then(res => setBooks(res.data));

    // 임시 책 데이터
    setBooks([
      { id: 1, title: '제목1', author: '작가1' },
      { id: 2, title: '제목2', author: '작가2' },
      { id: 3, title: '제목3', author: '작가3' },
    ]);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* 네비게이션 바 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ddd', padding: '10px 20px' }}>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/home')}>홈</span>
        <h3 style={{ margin: 0 }}>작가의 산책</h3>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/my')}>My</span>
      </div>

      {/* 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px' }}>
        <button onClick={() => navigate('/books')} style={buttonStyle}>도서 목록</button>
        <button onClick={() => navigate('/create')} style={buttonStyle}>도서 추가</button>
      </div>

      {/* 새로 나온 책 */}
      <div style={{ padding: '0 20px' }}>
        <h4>새로운 책</h4>
        <div style={{ display: 'flex', gap: '20px', backgroundColor: '#ddd', padding: '20px' }}>
          {books.map(book => (
            <div key={book.id} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(`/books/${book.id}`)}>
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