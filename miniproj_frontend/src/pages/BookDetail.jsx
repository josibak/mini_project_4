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
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fff', minHeight: '100vh', overflowY: 'scroll' }}>
      {/* ✅ 네비게이션 - Home 기준 통일 */}
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

      {/* 본문 */}
      <div style={{ maxWidth: '860px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontWeight: '700', fontSize: '32px', marginBottom: '32px' }}>Book Detail</h2>

        {/* 책 정보 */}
        <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
          {/* 표지 이미지 */}
          <div style={{
            width: '220px',
            height: '280px',
            backgroundColor: '#9ca3af',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {book.coverImageUrl ? (
              <img
                src={book.coverImageUrl}
                alt="커버 이미지"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ color: '#fff', fontSize: '12px' }}>img</span>
            )}
          </div>

          {/* 텍스트 정보 */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ marginBottom: '10px', fontSize: '22px' }}>{book.title}</h3>
            <p style={{ margin: '2px 0', color: '#666', fontSize: '16px' }}>{book.username || 'username'}</p>
            <p style={{ margin: '2px 0', color: '#666', fontSize: '16px' }}>
              등록일: {book.createdAt?.split('T')[0] || '-'}
            </p>
            <p style={{ margin: '2px 0', color: '#666', fontSize: '16px' }}>
              최종 수정일: {book.updatedAt?.split('T')[0] || '-'}
            </p>
          </div>
        </div>

        {/* 내용 박스 */}
        <div style={{
          backgroundColor: '#f3f3f3',
          padding: '20px',
          borderRadius: '12px',
          fontSize: '16px',
          minHeight: '160px',
          lineHeight: '1.6',
        }}>
          {book.description || '내용 없음'}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
