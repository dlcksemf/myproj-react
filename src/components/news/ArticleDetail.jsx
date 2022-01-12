import { useApiAxios } from 'api/base';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function ArticleDetail({ articleId }) {
  const url = `/news/api/articles/${articleId}`;
  const [{ data: article, loading, error }, refetch] = useApiAxios(url);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {loading && 'Loading ...'}
      {error && 'Error during Load.'}
      {article && (
        <>
          <h3 className="text-2xl my-5">{article.title}</h3>
          <div>
            {article.content.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
        </>
      )}

      <hr />
      <div className="flex gap-4 mt-3 mb-10">
        <Link to="/news/" className="hover:text-red-400">
          LIST
        </Link>
        <Link to={`/news/${articleId}/edit/`} className="hover:text-red-400">
          EDIT
        </Link>
      </div>
    </div>
  );
}

export default ArticleDetail;
