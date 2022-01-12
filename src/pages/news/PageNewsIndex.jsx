import ArticleList from 'components/news/ArticleList';

// 뉴스 서비스의 대문 페이지
function PageNewsIndex() {
  return (
    <div>
      <h2>Page News Index</h2>
      <ArticleList />

      <h2>Recommended News</h2>

      <h2>Ad</h2>
    </div>
  );
}

export default PageNewsIndex;
