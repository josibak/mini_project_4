import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBookById, updateBook, deleteBook } from '../api/bookApi';

const BookEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBookById(id);
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        alert('도서 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await updateBook(id, { title, description, userId: user?.id });
      navigate('/my');
    } catch (error) {
      alert('수정 실패: ' + (error.response?.data?.message || '서버 오류'));
    }
  };

  const handleAICover = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    navigate('/ai-cover', {
      state: {
        id: Number(id),
        title,
        description,
        userId: user?.id,
      },
    });
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 도서를 삭제하시겠습니까?")) return;
    try {
      await deleteBook(id);
      alert("도서가 성공적으로 삭제되었습니다.");
      navigate('/my');
    } catch (error) {
      alert('삭제 실패: ' + (error.response?.data?.message || '서버 오류'));
    }
  };

  if (loading) return <p style={{ padding: 20 }}>로딩 중...</p>;

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#fff', minHeight: '100vh', overflowY: 'scroll' }}>
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

      {/* Book Edit Form */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 20px 100px' }}>
        <h2 style={{ fontWeight: 700, fontSize: '32px', marginBottom: '32px' }}>Book Edit</h2>

        {/* TITLE */}
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>TITLE</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            style={inputStyle}
          />
        </div>

        {/* CONTENT */}
        <div style={{ marginBottom: '48px' }}>
          <label style={labelStyle}>CONTENT</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="content"
            style={textareaStyle}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
          <button onClick={handleAICover} style={uniformButton}>
            AI Cover
          </button>
          <button onClick={handleDelete} style={uniformButton}>
            Delete
          </button>
          <button onClick={handleSave} style={uniformButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// 공통 스타일
const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 500,
  color: '#555',
  marginBottom: '8px',
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '16px',
  boxSizing: 'border-box',
};

const textareaStyle = {
  width: '100%',
  height: '200px',
  padding: '12px 16px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '16px',
  resize: 'vertical',
  boxSizing: 'border-box',
};

const uniformButton = {
  minWidth: '140px',
  height: '48px',
  backgroundColor: '#111',
  color: '#fff',
  borderRadius: '999px',
  border: 'none',
  fontWeight: 600,
  fontSize: '16px',
  cursor: 'pointer',
};

export default BookEdit;
