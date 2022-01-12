import { Link } from 'react-router-dom';

function ArticleSummary({ article }) {
  const { title, id } = article;

  const truncateTitle = (title) => {
    return title.length > 10 ? `${title.substring(0, 10)} ...` : title;
  };

  return (
    <div>
      <Link to={`/news/${id}/`}>TITLE : {truncateTitle(title)}</Link>
    </div>
  );
}

export default ArticleSummary;
