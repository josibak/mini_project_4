import { useNavigate } from 'react-router-dom';

const AICover = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/user-book-list')}>저장 버튼</button>
      <button onClick={() => navigate('/home')}>홈 버튼</button>
    </div>
  );
};

export default AICover;
