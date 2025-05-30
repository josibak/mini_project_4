import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/user-book-list')}>마이 버튼</button>
      <button onClick={() => navigate('/book-list')}>도서 목록 버튼</button>
      <button onClick={() => navigate('/book-create')}>도서 추가 버튼</button>
      <button onClick={() => navigate('/book-detail')}>새로 나온 책 버튼</button>
    </div>
  );
};

export default Home;
