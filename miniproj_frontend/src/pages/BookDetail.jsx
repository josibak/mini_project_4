import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById } from '../api/bookApi';
// import mockBooks from '../data/mockBooks';
// import axios from 'axios';

const BookDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const book = mockBooks.find(b => b.id === Number(id));
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ 실제 API 연결 시 사용
  /*
  useEffect(() => {
    axios.get(`/api/books/${id}`).then(res => setBook(res.data));
  }, [id]);
  */

  useEffect(() => {
    const loadBooks = async() => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (error) {
        alert("도서 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [id]);

  if (!book) return <p style={{ padding: 20 }}>도서 정보를 찾을 수 없습니다.</p>;

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ddd', padding: '10px 20px' }}>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/home')}>홈</span>
        <h3 style={{ margin: 0 }}>도서 상세 정보</h3>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/my')}>My</span>
      </div>

      <div style={{ backgroundColor: '#eee', padding: 30, margin: 30 }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={coverStyle}>커버</div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div><strong>제목:</strong> {book.title}</div>
            <div><strong>작가:</strong> {book.author}</div>
            <div><strong>등록일:</strong> {book.created_at}</div>
            <div><strong>최종 수정일:</strong> {book.updated_at}</div>
          </div>
        </div>

        <div style={scrollBoxStyle}>
          {book.content}
        </div>
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
