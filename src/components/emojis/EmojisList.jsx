import { useEffect, useState } from 'react';
import { useApiAxios } from 'api/base.js';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import EmojisSummary from './EmojisSummary';

function EmojisList() {
  const navigate = useNavigate();
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
                <EmojisSummary emoji={emoji} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default EmojisList;
