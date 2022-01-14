import EmojisForm from 'components/emojis/EmojisForm';
import { useParams } from 'react-router-dom';

function PageEmojisForm() {
  const { emojiId } = useParams();

  return (
    <div>
      <h2>Page Emojis Form</h2>
      <EmojisForm emojiId={emojiId} />
    </div>
  );
}

export default PageEmojisForm;
