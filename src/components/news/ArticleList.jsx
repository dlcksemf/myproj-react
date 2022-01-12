import useAxios from 'axios-hooks';
import DebugStates from 'components/DebugStates';
import { API_HOST } from 'Constants';
import ArticleSummary from './ArticleSummary';

// 뉴스 기사 목록
function ArticleList() {
  const url = `${API_HOST}/news/api/articles/`;
  const [{ data: articleList, error, loading }, refetch] = useAxios(url);

  return (
    <div>
      <h2>Article List</h2>
      {loading && 'Loading ...'}
      {error && 'Error during Load.'}

      {articleList &&
        articleList.map((article) => {
          return <ArticleSummary article={article} key={article.id} />;
        })}

      <DebugStates data={articleList} loading={loading} error={error} />
    </div>
  );
}

export default ArticleList;
