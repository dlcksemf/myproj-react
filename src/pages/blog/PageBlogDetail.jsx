import { axiosInstance } from 'api/base';
import BlogDetail from 'components/blog/BlogDetail';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PageBlogDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // error 구현
  useEffect(() => {
    setLoading(true);
    const url = `/blog/api/posts/${postId}/`;

    axiosInstance
      .get(url)
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
      <BlogDetail
        post={post}
        loading={loading}
        handleMenu={() => {
          navigate('/blog/');
        }}
      />
    </div>
  );
}

export default PageBlogDetail;
