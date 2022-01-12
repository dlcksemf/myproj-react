import BlogList from 'components/blog/BlogList';
import { useNavigate } from 'react-router-dom';

function PageBlog() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate('/blog/new/');
        }}
        className="
          w-full
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
      >
        New Post
      </button>
      <BlogList />
    </div>
  );
}

export default PageBlog;
