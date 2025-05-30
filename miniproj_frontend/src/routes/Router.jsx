// src/routes/Router.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import BookList from '../pages/BookList';
import BookCreate from '../pages/BookCreate';
import BookDetail from '../pages/BookDetail';
import BookEdit from '../pages/BookEdit';
import UserBookList from '../pages/UserBookList';
import AICover from '../pages/AICover';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/books" element={<BookList />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/create" element={<BookCreate />} />
      <Route path="/edit/:id" element={<BookEdit />} />
      <Route path="/ai-cover" element={<AICover />} />
      <Route path="/my" element={<UserBookList />} />
    </Routes>
  );
}

export default Router;
