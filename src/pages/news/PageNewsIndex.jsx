import Button from 'components/Button';
import ArticleList from 'components/news/ArticleList';
import { useNavigate } from 'react-router-dom';

// 뉴스 서비스의 대문 페이지
function PageNewsIndex() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Page News Index</h2>
      <ArticleList />

      <Button onClick={() => navigate('/news/new/')}>NEW ARTICLE</Button>

      <h2>Recommended News</h2>

      <h2>Ad</h2>
    </div>
  );
}

export default PageNewsIndex;
