import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="px-4 py-2 bg-gray-100 shadow-md">
      <nav className="relative flex items-center h-12">
        {/* 좌측: 홈 */}
        <div className="absolute left-0">
          <Link to="/" className="text-xl font-bold">📚 홈</Link>
        </div>
        {/* 가운데: header */}
        <div className="mx-auto text-lg font-semibold">
          header
        </div>
        {/* 우측: My */}
        <div className="absolute right-0">
          <Link to="/books" className="text-xl font-bold">My</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
