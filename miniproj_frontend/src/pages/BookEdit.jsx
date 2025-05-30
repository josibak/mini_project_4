import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import mockBooks from '../data/mockBooks';  ❌ 사용하지 않음
// import axios from 'axios'; // ✅ API 연동 시 필요

const BookEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // ✅ 로컬스토리지에서 유저의 책을 찾아야 정확함
    const userBooks = JSON.parse(localStorage.getItem('userBooks') || '[]');
    const existingBook = userBooks.find((book) => book.id === Number(id));
    if (existingBook) {
      setTitle(existingBook.title);
      setContent(existingBook.content);
    }

    // ✅ API 연동 시 아래로 교체
    /*
    const token = localStorage.getItem('token');
    axios.get(`/api/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    })
    .catch((err) => {
      console.error('책 정보 불러오기 실패:', err);
    });
    */
  }, [id]);

  const handleSave = () => {
    const updatedBook = {
      id: Number(id),
      title,
      content,
      updated_at: new Date().toISOString().split('T')[0],
    };

    const userBooks = JSON.parse(localStorage.getItem('userBooks') || '[]');
    const updatedList = userBooks.map((b) =>
      b.id === updatedBook.id ? { ...b, ...updatedBook } : b
    );
    localStorage.setItem('userBooks', JSON.stringify(updatedList));
    navigate('/my');

    /*
    const token = localStorage.getItem('token');
    axios.put(`/api/books/${id}`, { title, content }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => navigate('/my'))
    .catch((err) => {
      alert('수정 실패: ' + (err.response?.data?.message || '서버 오류'));
    });
    */
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#ddd',
        padding: '10px 20px'
      }}>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/home')}>홈</span>
        <h3 style={{ margin: 0 }}>도서 수정</h3>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/my')}>My</span>
      </div>

      <div style={{ padding: 30 }}>
        <div>
          <div style={labelStyle}>1. 책 제목</div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={labelStyle}>2. 내용</div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={textareaStyle}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30, gap: 20 }}>
          <button
            style={buttonStyle}
            onClick={() =>
              navigate('/ai-cover', {
                state: {
                  id: Number(id),
                  title,
                  content
                }
              })
            }
          >
            AI 커버 변경
          </button>
          <button style={buttonStyle} onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
};

const labelStyle = {
  backgroundColor: '#ddd',
  padding: 10,
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: 10,
  backgroundColor: '#aaa',
  color: 'white',
  border: 'none',
};

const textareaStyle = {
  width: '100%',
  height: 150,
  backgroundColor: '#888',
  color: 'white',
  padding: 10,
  border: 'none',
  resize: 'vertical',
  overflowY: 'auto',
};

const buttonStyle = {
  backgroundColor: '#bfcfff',
  padding: '10px 20px',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer'
};

export default BookEdit;
