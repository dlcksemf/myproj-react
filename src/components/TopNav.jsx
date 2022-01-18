import { Link } from 'react-router-dom';
import useAuth from './hooks/useAuth';

function TopNav() {
  const [auth, , , logout] = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="my-3">
      <ul className="flex gap-4">
        {!auth.isLoggedIn && (
          <>
            <li>
              <MyLink to="/accounts/login/">로그인</MyLink>
            </li>
            <li>
              <MyLink to="/accounts/signup/">회원가입</MyLink>
            </li>
          </>
        )}

        {auth.isLoggedIn && (
          <>
            <li>
              <MyLink to="/accounts/profile/">프로필</MyLink>
            </li>
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
          </>
        )}

        <li>
          <MyLink to="/blog/">블로그</MyLink>
        </li>
        <li>
          <MyLink to="/news/">뉴스</MyLink>
        </li>
        <li>
          <MyLink to="/emojis/">Emojis</MyLink>
        </li>
      </ul>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <Link
      className="pb-1 text-gray-500 hover:text-red-500 hover:border-red-500 border-b-4 "
      to={to}
    >
      {children}
    </Link>
  );
}

export default TopNav;
