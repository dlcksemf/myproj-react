import { useNavigate } from 'react-router-dom';

function EmojisSummary({ emoji }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/emojis/${emoji.id}/`);
      }}
      className="h-48 w-48 relative cursor-pointer mb-5"
    >
      <div className="absolute inset-0 bg-violet-50 rounded-lg shadow-2xl">
        <p className="text-base text-body-color leading-relaxed mb-7 p-2 flex justify-center">
          {emoji.name}
        </p>
      </div>
      <div className="absolute inset-0 transform hover:translate-y-16 transition duration-300">
        <img
          src={emoji.apple_version}
          alt={emoji.name}
          className="h-full w-full bg-white rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}

export default EmojisSummary;
