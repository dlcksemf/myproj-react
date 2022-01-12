import ArticleDetail from 'components/news/ArticleDetail';
import { useParams } from 'react-router-dom';

function PageNewsArticleDetail() {
  const { articleId } = useParams();

  return (
    <div>
      <h2>Showing ... // News #{articleId}</h2>
      <ArticleDetail articleId={articleId} />

      <h3>Similar Articles</h3>

      <h3>Your Interest</h3>

      <h3>Ad</h3>
    </div>
  );
}

export default PageNewsArticleDetail;
