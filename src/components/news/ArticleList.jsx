import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import { useEffect } from 'react/cjs/react.development';
import ArticleSummary from './ArticleSummary';

// 뉴스 기사 목록
function ArticleList() {
  const url = '/news/api/articles/';
  const [{ data: articleList, error, loading }, fetchData] = useApiAxios(url);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Article List</h2>
      {loading && 'Loading ...'}
      {error && 'Error during Load.'}

      {articleList &&
        articleList.map((article) => (
          <div
            key={article.id}
            className="transition-transform duration-300 hover:-translate-y-5"
          >
            <ArticleSummary article={article} />
          </div>
        ))}

      <DebugStates data={articleList} loading={loading} error={error} />
    </div>
  );
}

export default ArticleList;
