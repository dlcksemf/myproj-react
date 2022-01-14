import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmojisDetail({ emojiId }) {
  const navigate = useNavigate();
  const [{ data, loading, error }, getEmoji] = useApiAxios(
    `/emojis/api/emojis/${emojiId}/`,
    { manual: true },
  );

  useEffect(() => {
    getEmoji();
  }, []);

  const deleteEmoji = () => {
    console.log('deleting emoji!');
  };

  return (
    <div>
      <h2>Emojis Detail</h2>
      <hr />

      {data?.name}
      <img src={data?.apple_version} alt={data?.name} />
      {data?.description}
      {data?.category}

      <div>
        <Button
          onClick={() => {
            navigate(`/emojis/${emojiId}/edit/`);
          }}
        >
          Edit
        </Button>
        <Button onClick={deleteEmoji}>Delete</Button>
      </div>

      <DebugStates data={data} />
    </div>
  );
}

export default EmojisDetail;
