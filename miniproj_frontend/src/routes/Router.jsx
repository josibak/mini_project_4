import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AICover from '../pages/AICover';
import BookCreate from '../pages/BookCreate';
import BookDetail from '../pages/BookDetail';
import BookEdit from '../pages/BookEdit';
import BookList from '../pages/BookList';
import UserBookList from '../pages/UserBookList';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/ai-cover" element={<AICover />} />
      <Route path="/book-create" element={<BookCreate />} />
      <Route path="/book-detail" element={<BookDetail />} />
      <Route path="/book-edit" element={<BookEdit />} />
      <Route path="/book-list" element={<BookList />} />
      <Route path="/user-book-list" element={<UserBookList />} />
    </Routes>
  );
};

export default Router;


































































