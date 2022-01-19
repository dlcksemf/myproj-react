import { useEffect, useReducer, useState } from 'react';
import { useApiAxios } from 'api/base.js';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import EmojisSummary from './EmojisSummary';

const INITIAL_EMOJI_VER = 'apple_version';

const ACTION_TYPE = {
  APPLE_VERSION: 'apple_version',
  GOOGLE_VERSION: 'google_version',
};

function reducer(prevState, action) {
  const { method } = action;
  switch (method) {
    case ACTION_TYPE.APPLE_VERSION:
      return 'apple_version';
    case ACTION_TYPE.GOOGLE_VERSION:
      return 'google_version';
    default:
      return prevState;
  }
}

function EmojisList() {
  const navigate = useNavigate();
  const [emojiVer, dispatch] = useReducer(reducer, INITIAL_EMOJI_VER);
  const [query, setQuery] = useState();
  const [{ data, loading, error }, refetch] = useApiAxios(
    `emojis/api/emojis/${query ? '?query=' + query : ''}`,
    {
      manual: true,
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const searchEmojis = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <div>
      <input type="text" onChange={getQuery} onKeyPress={searchEmojis} />
      <Button
        onClick={() => {
          navigate('/emojis/new/');
        }}
      >
        New Emoji
      </Button>

      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          onClick={() => {
            dispatch({ method: ACTION_TYPE.APPLE_VERSION });
          }}
        >
          apple ver.
        </button>
        <button
          type="button"
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          onClick={() => {
            dispatch({ method: ACTION_TYPE.GOOGLE_VERSION });
          }}
        >
          google ver.
        </button>
      </div>

      <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]">
        <div className="container">
          <div className="flex flex-wrap mx-4">
            <div className="w-full md:w-1/2 xl:w-1/5 flex justify-center mb-16">
              <div
                onClick={() => {
                  navigate(
                    `/emojis/${
                      data[Math.floor(Math.random() * data.length)].id
                    }/`,
                  );
                }}
                className="h-48 w-48 relative cursor-pointer mb-5"
              >
                <div className="absolute inset-0 bg-white rounded-lg shadow-2xl">
                  <p className="text-base text-body-color leading-relaxed mb-7 p-2 flex justify-center">
                    Random!
                  </p>
                </div>
                <div className="absolute inset-0 transform hover:translate-y-16 transition duration-300">
                  <div className="h-full w-full bg-white rounded-lg shadow-2xl"></div>
                </div>
              </div>
            </div>

            {data?.map((emoji) => (
              <div
                key={emoji.id}
                className="w-full md:w-1/2 xl:w-1/5 flex justify-center mb-16"
              >
                <EmojisSummary emoji={emoji} imageVer={emojiVer} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default EmojisList;
