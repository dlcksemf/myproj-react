import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import useFieldValues from 'components/hooks/useFieldValues';
import Input from 'components/Input';
import produce from 'immer';
import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// https://tailwindcomponents.com/component/form-with-file-input

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

const InputContext = createContext();

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
      <div className="flex bg-gray-200 items-center justify-center">
        <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2 m-3">
          <div className="flex justify-center py-4">
            <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
                Tailwind Form
              </h1>
            </div>
          </div>

          <InputContext.Provider value={{ handleFieldChange, fieldValues }}>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 mt-5 mx-7">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  Emoji Name
                </label>
                <Input name="name" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                <div className="grid grid-cols-1">
                  <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                    Apple Name
                  </label>
                  <Input name="apple_name" />
                </div>

                <div className="grid grid-cols-1">
                  <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                    Other Names
                  </label>
                  <Input name="other_names" />
                </div>
              </div>

              <div className="grid grid-cols-1 mt-5 mx-7">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  value={fieldValues.description}
                  placeholder="description"
                  onChange={handleFieldChange}
                  className="py-2 px-3 h-48 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 mt-5 mx-7">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  Category
                </label>
                <select
                  name="category"
                  value={fieldValues.category}
                  onChange={handleFieldChange}
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
              </div>

              <div className="grid grid-cols-1 mt-5 mx-7">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  Removed?
                </label>
                <Input type="checkbox" name="removed" />
              </div>

              <div className="grid grid-cols-1 mt-5 mx-7">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  Released Date
                </label>
                <Input name="released_date" />
              </div>

              <div className="grid grid-cols-1 mt-5 mx-7">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  Released Version // Emoji
                </label>
                <Input name="released_emoji_version" />
              </div>

              <div className="grid grid-cols-1 mt-5 mx-7">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
                  Upload Photo
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                        Select a photo
                      </p>
                    </div>
                    <Input
                      type="file"
                      name="apple_version"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
                <button
                  onClick={() => {
                    navigate(!emojiId ? '/emojis/' : `/emojis/${emojiId}`);
                  }}
                  className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
                >
                  Cancel
                </button>
                <button className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
                  Save
                </button>
              </div>
            </form>
          </InputContext.Provider>
        </div>
      </div>
      <DebugStates emoji={emoji} fieldValues={fieldValues} />
    </div>
  );
}

export { EmojisForm, InputContext };
