import { useNavigate } from 'react-router-dom';

const BookEdit = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/user-book-list')}>저장 버튼</button>
      <button onClick={() => navigate('/home')}>홈 버튼</button>
      <button onClick={() => navigate('/ai-cover')}>AI 커버 변경 버튼</button>
      <button onClick={() => navigate('/user-book-list')}>마이 버튼</button>
    </div>
  );
};

export default BookEdit;
