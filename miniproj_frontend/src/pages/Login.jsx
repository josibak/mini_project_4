import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/home')}>로그인 버튼</button>
    </div>
  );
};

export default Login;
