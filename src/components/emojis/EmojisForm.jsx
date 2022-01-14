import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import useFieldValues from 'components/hooks/useFieldValues';
import produce from 'immer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const INIT_FIELDVALUES = {
  id: '',
  created_at: '',
  updated_at: '',
  name: '',
  apple_name: '',
  other_names: '',
  description: '',
  category: 'Smileys & People',
  removed: false,
  released_date: '',
  released_emoji_version: '',
};

function EmojisForm({ emojiId }) {
  const navigate = useNavigate();
  const [{ data: emoji, loading: getLoading, error: getError }] = useApiAxios(
    `emojis/api/emojis/${emojiId}/`,
    { manual: !emojiId },
  );

  const [
    { loading: saveLoading, error: saveError, saveErrorMessages },
    saveEmoji,
  ] = useApiAxios(
    {
      url: `emojis/api/emojis/${!emojiId ? '' : emojiId + '/'}`,
      method: !emojiId ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues, formData } =
    useFieldValues(emoji || INIT_FIELDVALUES);

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.apple_version = '';
      }),
    );
  }, [emoji]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEmoji({ data: formData }).then((response) => {
      const savedEmoji = response.data;
      navigate(`/emojis/${savedEmoji.id}/`);
    });
  };

  return (
    <div>
      <h2>Emojis Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleFieldChange}
          value={fieldValues.name}
          placeholder="name"
        />
        <input
          type="text"
          name="apple_name"
          onChange={handleFieldChange}
          value={fieldValues.apple_name}
          placeholder="apple_name"
        />
        <input
          type="text"
          name="other_names"
          onChange={handleFieldChange}
          value={fieldValues.other_names}
          placeholder="other_names"
        />
        <textarea
          name="description"
          onChange={handleFieldChange}
          value={fieldValues.description}
          placeholder="description"
        />
        <select
          name="category"
          onChange={handleFieldChange}
          value={fieldValues.category}
        >
          <option>Smileys & People</option>
          <option>Animals & Nature</option>
          <option>Food & Drink</option>
          <option>Activity</option>
          <option>Travel & Places</option>
          <option>Objects</option>
          <option>Symbols</option>
          <option>Flags</option>
        </select>

        <input
          type="checkbox"
          onChange={handleFieldChange}
          value={fieldValues.removed}
          name="removed"
        />
        <input
          type="text"
          name="released_date"
          onChange={handleFieldChange}
          value={fieldValues.released_date}
          placeholder="released_date"
        />
        <input
          type="text"
          name="released_emoji_version"
          onChange={handleFieldChange}
          value={fieldValues.released_emoji_version}
          placeholder="released_emoji_version"
        />
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="apple_version"
          onChange={handleFieldChange}
        />

        <Button>Save</Button>
      </form>

      <DebugStates emoji={emoji} fieldValues={fieldValues} />
    </div>
  );
}

export default EmojisForm;
