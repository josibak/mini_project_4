// src/pages/UserBookList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockUserBooks from '../data/mockUserBooks'; // ✅ 임시 데이터 분리 import
// import axios from 'axios'; // ✅ API 연동 시 필요

const UserBookList = () => {
  const navigate = useNavigate();
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    // ✅ 1. 로컬스토리지에서 유저 도서 불러오기
    const savedBooks = JSON.parse(localStorage.getItem('userBooks') || '[]');
    if (savedBooks.length > 0) {
      setUserBooks(savedBooks);
    } else {
      // ✅ 초기에는 임시 mock 데이터 사용
      setUserBooks(mockUserBooks);
      localStorage.setItem('userBooks', JSON.stringify(mockUserBooks));
    }

    // ✅ 2. API 연동 시 아래 코드로 대체
    /*
    const token = localStorage.getItem('token');
    axios.get('/api/user/books', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setUserBooks(res.data);
    })
    .catch((err) => {
      console.error('유저 도서 불러오기 실패:', err);
    });
    */
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* 상단 네비게이션 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ddd', padding: '10px 20px' }}>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/home')}>홈</span>
        <h3 style={{ margin: 0 }}>유저 도서 목록</h3>
        <span />
      </div>

      {/* 도서 리스트 */}
      <div style={{ padding: '20px' }}>
        {userBooks.length === 0 ? (
          <p>등록된 도서가 없습니다.</p>
        ) : (
          userBooks.map((book) => (
            <div key={book.id} style={cardStyle}>
              {/* ✅ 커버, 제목, 날짜 클릭 → BookDetail 이동 */}
              <div
                onClick={() => navigate(`/books/${book.id}`, { state: book })} // ✅ 상태 전달
                style={{ display: 'flex', alignItems: 'center', flex: 1, cursor: 'pointer' }}
              >
                <div style={coverStyle}>커버</div>
                <div style={{ marginLeft: '10px' }}>
                  <div><strong>{book.title}</strong></div>
                  <div>등록일: {book.created_at || 'N/A'}</div>
                  <div>최종 수정일: {book.updated_at || 'N/A'}</div>
                </div>
              </div>

              {/* ✅ 수정 버튼 */}
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
  backgroundColor: '#eee',
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
};

export default UserBookList;