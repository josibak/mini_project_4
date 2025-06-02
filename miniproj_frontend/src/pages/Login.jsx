import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력하세요.');
      return;
    }

    try {
      const response = await axiosInstance.post('/users/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      if (!user?.userId) {
        throw new Error('로그인 응답에 userId가 포함되어 있지 않습니다.');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/home');
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 실패: ' + (error.response?.data?.message || error.message || '서버 오류'));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ width: '360px', textAlign: 'left' }}>
        <h2 style={{ fontWeight: '600', marginBottom: '30px' }}>Login</h2>

        <label style={{ fontSize: '12px', color: '#555' }}>E-mail</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your e-mail"
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            marginTop: '4px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#f1f5f9',
          }}
        />

        <label style={{ fontSize: '12px', color: '#555' }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type your password"
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '30px',
            marginTop: '4px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#f1f5f9',
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
