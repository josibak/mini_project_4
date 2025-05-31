// src/pages/BookDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById } from '../api/bookApi';

const BookDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (error) {
        alert('도서 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>로딩 중...</p>;
  if (!book) return <p style={{ padding: 20 }}>도서 정보를 찾을 수 없습니다.</p>;

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* 상단 네비게이션 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#ddd',
          padding: '10px 20px',
        }}
      >
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/home')}>
          홈
        </span>
        <h3 style={{ margin: 0 }}>도서 상세 정보</h3>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/my')}>
          My
        </span>
      </div>

      {/* 도서 정보 영역 */}
      <div style={{ backgroundColor: '#eee', padding: 30, margin: 30 }}>
        <div style={{ display: 'flex', gap: 20 }}>
          {/* 커버 이미지 */}
          <div style={coverStyle}>
            {book.coverImageUrl ? (
              <img
                src={book.coverImageUrl}
                alt="커버"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
              />
            ) : (
              <span style={{ color: 'white', fontWeight: 'bold' }}>표지 없음</span>
            )}
          </div>

          {/* 책 정보 */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div>
              <strong>제목:</strong> {book.title}
            </div>
            <div>
              <strong>작가:</strong> {book.author || '정보 없음'}
            </div>
            <div>
              <strong>등록일:</strong> {book.createdAt?.split('T')[0] || 'N/A'}
            </div>
            <div>
              <strong>최종 수정일:</strong> {book.updatedAt?.split('T')[0] || 'N/A'}
            </div>
          </div>
        </div>

        {/* 책 설명 */}
        <div style={scrollBoxStyle}>{book.description}</div>
      </div>
    </div>
  );
};

const coverStyle = {
  width: '80px',
  height: '120px',
  backgroundColor: '#f08080',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: 4,
};

const scrollBoxStyle = {
  backgroundColor: '#999',
  marginTop: 20,
  padding: 20,
  height: 200,
  overflowY: 'auto',
  whiteSpace: 'pre-wrap',
  color: 'white',
  borderRadius: 4,
};

export default BookDetail;
