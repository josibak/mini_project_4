// // src/pages/Login.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../api/axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       alert('이메일과 비밀번호를 입력하세요.');
//       return;
//     }

//     try {
//       // 로그인 API 요청
//       const response = await axiosInstance.post('/users/login', {
//         email,
//         password,
//       });

//       const token = response.data.token;
//       localStorage.setItem('token', token);

//       // 이후 다른 페이지에서 자동으로 토큰이 포함된 요청 사용 가능
//       navigate('/home');
//     } catch (error) {
//       alert('로그인 실패: ' + (error.response?.data?.message || '서버 오류'));
//     }
//   };

//   return (
//     <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
//       <div style={{ backgroundColor: '#ddd', padding: 20 }}>
//         <h2>로그인</h2>
//       </div>

//       <div style={{ marginTop: 100 }}>
//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="email"
//           style={{ padding: 10, marginBottom: 10, backgroundColor: '#ddd', display: 'block', margin: '10px auto' }}
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="password"
//           style={{ padding: 10, display: 'block', margin: '10px auto', border: '2px solid #0099ff' }}
//         />
//         <button
//           onClick={handleLogin}
//           style={{ backgroundColor: '#bfcfff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
//         >
//           로그인
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력하세요.');
      return;
    }

    // 하드코딩된 로그인 처리
    if (email === 'test@example.com' && password === '1234') {
      const fakeToken = 'mocked-jwt-token';
      const fakeUser = {
        id: 1,
        email: 'test@example.com',
        name: '테스트유저'
      };

      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      navigate('/home');
    } else {
      alert('로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.');
    }
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
