function ReviewForm({
  handleChange,
  fieldValues,
  errorMessages,
  submitReview,
  loading,
}) {
  const handleClickedSubmitButton = (e) => {
    if (submitReview) {
      submitReview(e);
    } else {
      console.error('submitReview 함수 구현');
    }
  };

  return (
    <div>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <form>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              평점
            </label>
            <select
              onChange={handleChange}
              disabled={loading}
              value={fieldValues.score}
              name="score"
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <div className="text-red-400">{errorMessages.score}</div>
          </div>
          <div className="form-group mb-6">
            <textarea
              onChange={handleChange}
              disabled={loading}
              value={fieldValues.content}
              name="content"
              className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
              id="exampleFormControlTextarea13"
              rows="3"
              placeholder="Message"
            ></textarea>
            <div className="text-red-400">{errorMessages.content}</div>
          </div>

          <button
            onClick={handleClickedSubmitButton}
            disabled={loading}
            className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            {loading && '로딩'}
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
