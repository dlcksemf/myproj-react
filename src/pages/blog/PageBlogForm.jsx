import BlogForm from 'components/blog/BlogForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageBlogForm() {
  const { postId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <BlogForm
        postId={postId}
        handleDidSave={(savedPost) => navigate(`/blog/${savedPost.id}`)}
      />
    </div>
  );
}

export default PageBlogForm;
