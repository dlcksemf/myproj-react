import { useEffect } from 'react';
import DebugStates from 'components/DebugStates.jsx';
import { useApiAxios } from 'api/base.js';
import { useNavigate } from 'react-router-dom';
import H2 from 'components/H2';
import Button from 'components/Button';

function EmojisList() {
  const navigate = useNavigate();
  const [{ data, loading, error }, refetch] = useApiAxios('emojis/api/emojis', {
    manual: true,
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          navigate('/emojis/new/');
        }}
      >
        New Emoji
      </Button>
      {data?.map(({ name, apple_version, id: emojiId }) => (
        <div
          onClick={() => {
            navigate(`/emojis/${emojiId}/`);
          }}
          className="m-2 p-2 border border-red-400 cursor-pointer"
        >
          <H2>{name}</H2>
          <img src={apple_version} alt={name} />
        </div>
      ))}
      <DebugStates data={data} />
    </div>
  );
}

export default EmojisList;
