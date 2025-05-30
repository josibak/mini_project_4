import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const token = response.data.token; // API 정의서에서 토큰 확인
      localStorage.setItem('token', token); // 로그인 상태 유지용
      navigate('/'); // 홈 또는 메인 페이지로 이동
    } catch (error) {
      alert("로그인 실패: " + error.response?.data?.message || "서버 오류");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>로그인</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default Login;