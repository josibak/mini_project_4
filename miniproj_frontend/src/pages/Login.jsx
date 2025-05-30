import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력하세요.');
      return;
    }

    // ✅ 백엔드가 없을 때: 가짜 로그인 처리
    if (email === 'test@example.com' && password === '1234') {
      const fakeToken = 'mocked-jwt-token';
      localStorage.setItem('token', fakeToken);
      navigate('/home');
    } else {
      alert('로그인 실패: 잘못된 이메일 또는 비밀번호');
    }

    // ✅ 실제 API 연결 시 아래 코드로 교체
    /*
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (error) {
      alert('로그인 실패: ' + (error.response?.data?.message || '서버 오류'));
    }
    */
  };

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ backgroundColor: '#ddd', padding: 20 }}>
        <h2>로그인</h2>
      </div>

      <div style={{ marginTop: 100 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          style={{ padding: 10, marginBottom: 10, backgroundColor: '#ddd', display: 'block', margin: '10px auto' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          style={{ padding: 10, display: 'block', margin: '10px auto', border: '2px solid #0099ff' }}
        />
        <button
          onClick={handleLogin}
          style={{ backgroundColor: '#bfcfff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
