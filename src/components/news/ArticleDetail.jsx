import { useApiAxios } from 'api/base';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';

function ArticleDetail({ articleId }) {
  const navigate = useNavigate();

  const [{ data: article, loading, error }, refetch] = useApiAxios(
    `/news/api/articles/${articleId}`,
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteArticle] =
    useApiAxios(
      {
        url: `/news/api/articles/${articleId}`,
        method: 'DELETE',
      },
      {
        manual: true,
      },
    );

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      deleteArticle().then(() => {
        navigate('/news/');
      });
    }
  };

  return (
    <div>
      {loading && <LoadingIndicator />}
      {deleteLoading && <LoadingIndicator>삭제 중 ...</LoadingIndicator>}

      {error &&
        `Error during Load. (${error.response.status} ${error.response.statusText})`}
      {deleteError &&
        `Error during Delete. (${deleteError.response.status} ${deleteError.response.statusText})`}

      <h3 className="text-2xl my-5">{article?.title}</h3>

      {article?.photo && (
        <img src={article.photo} alt={article.title} className="rounded" />
      )}

      {article?.content.split(/[\r\n]+/).map((line, index) => (
        <p className="my-3" key={index}>
          {line}
        </p>
      ))}

      <hr />
      <div className="flex gap-4 mt-3 mb-10">
        <Link to="/news/" className="hover:text-red-400">
          LIST
        </Link>
        <Link to={`/news/${articleId}/edit/`} className="hover:text-red-400">
          EDIT
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleteLoading}
          className="hover:text-red-400"
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default ArticleDetail;
