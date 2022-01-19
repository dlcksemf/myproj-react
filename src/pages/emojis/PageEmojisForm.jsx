import DebugStates from 'components/DebugStates';
import { EmojisForm } from 'components/emojis/EmojisForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageEmojisForm() {
  const navigate = useNavigate();
  const { emojiId } = useParams();

  return (
    <div>
      <h2>Page Emojis Form</h2>
      <EmojisForm
        emojiId={emojiId}
        handleDidSave={(savedEmoji) => navigate(`/emojis/${savedEmoji.id}`)}
      />

      <DebugStates emojiId={emojiId} />
    </div>
  );
}

export default PageEmojisForm;
