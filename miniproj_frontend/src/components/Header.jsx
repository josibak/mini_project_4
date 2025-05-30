// src/components/Header.jsx
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="px-4 py-2 bg-gray-100 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">📚 홈</Link>
      <Link to="/books">My</Link>
      <nav className="space-x-4">
        
        <Link to="/write">도서 추가</Link>
      </nav>
    </header>
  );
};

export default Header;
