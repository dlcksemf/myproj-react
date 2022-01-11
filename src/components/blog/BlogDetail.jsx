// https://tailwindcomponents.com/component/avatar-ui-design

function BlogDetail({ post, loading, handleMenu }) {
  const menuButtonClicked = () => {
    if (handleMenu) {
      handleMenu();
    } else {
      console.error('No handleMenu function');
    }
  };

  return (
    <div className="flex justify-center items-center rounded grid md:grid-cols-2 grid-cols-1 shadow-2xl bg-slate-800 xl:w-4/5 md:w-full md:h-4/5 h-full w-96 text-center text-sm rounded-sm">
      <div className="px-3">
        <img src="https://placeimg.com/640/480/tech" alt="tech photos" />
        <div
          onClick={menuButtonClicked}
          className="my-5 cursor-pointer transition-all duration-150 hover:bg-green-500 bg-green-400 md:px-12  sm:px-10 sm:py-3 px-8 py-2 text-center rounded-full md:text-xl text-md text-my-color font-medium"
        >
          Back to List
        </div>
      </div>

      <div className="bg-my-color text-white w-full h-full flex justify-center items-center px-3 py-4 text-center">
        <div className="h-full px-8 text-gray-100 lg:text-lg">
          <div className="font-sans md:mb-3 mb-2">
            <h2 className="uppercase font-medium">{post.title}</h2>
          </div>
          <p className="lg:text-md text-sm">{post.content}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
