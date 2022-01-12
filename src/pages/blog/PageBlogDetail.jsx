import BlogDetail from 'components/blog/BlogDetail';
import { useParams } from 'react-router-dom';

function PageBlogDetail() {
  const { postId } = useParams();

  return (
    <div>
      <BlogDetail postId={postId} />
    </div>
  );
}

export default PageBlogDetail;
