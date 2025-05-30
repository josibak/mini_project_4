import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/user-book-list')}>마이 버튼</button>
      <button onClick={() => navigate('/home')}>홈 버튼</button>
      <button onClick={() => navigate('/book-detail')}>도서 상세 버튼</button>
    </div>
  );
};

export default BookList;
