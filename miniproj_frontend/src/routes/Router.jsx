import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
// import BookList from '../pages/BookList';
// import BookCreate from '../pages/BookCreate';
// import UserBookList from '../pages/UserBookList';
import BookDetail from '../pages/BookDetail'; // 도서 상세 페이지

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/books" element={<BookList />} />
      <Route path="/create" element={<BookCreate />} />
      <Route path="/my" element={<UserBookList />} /> */}
      <Route path="/books/:id" element={<BookDetail />} /> {/* 도서 상세 */}
    </Routes>
  );
}

export default Router;
