import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmojisDetail({ emojiId }) {
  const navigate = useNavigate();
  const [{ data, loading, error }, getEmoji] = useApiAxios(
    `/emojis/api/emojis/${emojiId}/`,
    { manual: true },
  );

  const [{ loading: deleteLoading, erorr: deleteError }, deleteEmoji] =
    useApiAxios(
      { url: `/emojis/api/emojis/${emojiId}/`, method: 'DELETE' },
      { manual: true },
    );

  useEffect(() => {
    getEmoji();
  }, []);

  const handleDeleteButton = () => {
    deleteEmoji().then(() => {
      navigate('/emojis/');
    });
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
        <Button onClick={handleDeleteButton}>Delete</Button>
      </div>
    </div>
  );
}

export default EmojisDetail;
