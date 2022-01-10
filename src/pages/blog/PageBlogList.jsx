import BlogList from 'components/blog/BlogList';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PageBlog() {
  const [postList, setPostList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    setError(null);
    setLoading(true);
    const url = 'http://localhost:8000/blog/api/posts/';

    Axios.get(url)
      .then(({ data }) => {
        setPostList(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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

      {postList.map((post) => {
        return <BlogList post={post} navigate={navigate} key={post.id} />;
      })}
    </div>
  );
}

export default PageBlog;
