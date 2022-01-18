import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import useAuth from 'components/hooks/useAuth';
import { useEffect } from 'react';
import ArticleSummary from './ArticleSummary';

// 뉴스 기사 목록
function ArticleList() {
  const [auth] = useAuth();
  const url = '/news/api/articles/';
  const [{ data: articleList, error, loading }, fetchData] = useApiAxios(
    {
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    fetchData();
  }, [auth]);

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
