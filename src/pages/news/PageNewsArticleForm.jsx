import ArticleForm from 'components/news/ArticleForm';
import { useNavigate } from 'react-router-dom';

// 함수 안에서는 새로운 객체 생성 최소화

function PageNewsArticleForm() {
  const navigate = useNavigate();

  return (
    <ArticleForm
      articleId={null}
      handleDidSave={(savedPost) => navigate(`/news/${savedPost.id}`)}
    />
  );
}

export default PageNewsArticleForm;
