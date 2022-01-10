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
      {postList.map((post) => {
        return <BlogList post={post} navigate={navigate} key={post.id} />;
      })}
    </div>
  );
}

export default PageBlog;
