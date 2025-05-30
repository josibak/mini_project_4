import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import BookList from '../pages/BookList';
import BookCreate from '../pages/BookCreate'; // 나중에 만들 예정
import UserBookList from '../pages/UserBookList'; // 나중에 만들 예정
import BookDetail from '../pages/BookDetail'; // 나중에 만들 예정

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/books" element={<BookList />} />         {/* ✅ 도서 목록 연결 */}
      <Route path="/create" element={<BookCreate />} />       {/* 도서 추가 */}
      <Route path="/my" element={<UserBookList />} />         {/* 마이페이지 */}
      <Route path="/books/:id" element={<BookDetail />} />    {/* 도서 상세 */}
    </Routes>
  );
}

export default Router;