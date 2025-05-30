import { useNavigate } from 'react-router-dom';

const UserBookList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/home')}>홈 버튼</button>
      <button onClick={() => navigate('/book-edit')}>수정 버튼</button>
    </div>
  );
};

export default UserBookList;
