import EmojisDetail from 'components/emojis/EmojisDetail';
import { useParams } from 'react-router-dom';

function PageEmojisDetail() {
  const { emojiId } = useParams();

  return (
    <div>
      <h2>Page Emojis Detail</h2>
      <EmojisDetail emojiId={emojiId} />
    </div>
  );
}

export default PageEmojisDetail;
