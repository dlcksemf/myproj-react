import BlogList from 'components/blog/BlogList';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import DebugStates from 'components/DebugStates';

function PageBlog() {
  const [postList, setPostList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <DebugStates postList={postList} />

      {postList.map((post) => {
        return <BlogList post={post} />;
      })}
    </div>
  );
}

export default PageBlog;
