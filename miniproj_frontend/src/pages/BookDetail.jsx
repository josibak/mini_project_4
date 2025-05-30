import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: 40 }}>
      <h2>도서 상세 페이지</h2>
      <p>도서 ID: {id}</p>
      {/* API 연결 시 ID 기반 데이터 불러와서 표시 */}
    </div>
  );
};

export default BookDetail;
