import { Link } from 'react-router-dom';

function ArticleSummary({ article }) {
  const { title, id } = article;

  const truncateTitle = (title) => {
    return title.length > 10 ? `${title.substring(0, 10)} ...` : title;
  };

  return (
    <div>
      {article.photo && (
        <img
          src={article.photo}
          alt={article.title}
          className="w-10 h-10 inline"
        />
      )}
      <p>by {article?.author?.username}</p>
      <Link to={`/news/${id}/`}> {truncateTitle(title)}</Link>
    </div>
  );
}

export default ArticleSummary;
