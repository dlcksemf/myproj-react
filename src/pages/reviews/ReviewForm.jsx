import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useFieldValues from 'components/hooks/useFieldValues';

const INITIAL_STATE = { content: '', score: 0 };

function ReviewForm() {
  const navigate = useNavigate();
  const [fieldValues, handleChange, emptyFieldValues, setFieldValues] =
    useFieldValues(INITIAL_STATE);

  const submitReview = (e) => {
    e.preventDefault();
    const url = 'http://127.0.0.1:8000/shop/api/reviews/';

    Axios.post(url, fieldValues)
      .then(() => {
        navigate('/reviews/');
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        emptyFieldValues();
      });
  };

  return (
    <div>
      <h2>Review Form</h2>

      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <form>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              평점
            </label>
            <select
              name="score"
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            >
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="form-group mb-6">
            <textarea
              onChange={handleChange}
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
          </div>

          <button
            onClick={submitReview}
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
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
