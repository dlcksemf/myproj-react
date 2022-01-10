import BlogDetail from 'components/blog/BlogDetail';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function PageBlogDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);

  // error 구현
  useEffect(() => {
    setLoading(true);
    const url = `http://localhost:8000/blog/api/posts/${postId}/`;

    Axios.get(url)
      .then(({ data }) => {
        setPost(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId]);

  return (
    <div>
      <BlogDetail post={post} loading={loading} />
    </div>
  );
}

export default PageBlogDetail;
