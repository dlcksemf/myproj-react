// loading 추가
// https://tailwindcomponents.com/component/tailwind-login-form

import useFieldValues from 'components/hooks/useFieldValues';
import { useApiAxios } from 'api/base';
import LoadingIndicator from 'components/LoadingIndicator';

const INIT_FIELD_VALUES = { title: '', content: '' };

function BlogForm({ postId, handleDidSave }) {
  const [{ data: post, error: getError, loading: getLoading }] = useApiAxios(
    `/blog/api/posts/${postId}/`,
    { manual: !postId },
  );

  const [
    {
      error: saveError,
      loading: saveLoading,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: `/blog/api/posts/${!postId ? '' : postId + '/'}`,
      method: !postId ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } = useFieldValues(
    post || INIT_FIELD_VALUES,
  );

  const savePost = (e) => {
    e.preventDefault();
    saveRequest({ data: fieldValues }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>Saving ...</LoadingIndicator>}
      {saveError &&
        `error ... (${saveError.response.status} ${saveError.response.statusText})`}

      {getLoading && <LoadingIndicator />}
      {getError && (
        <h2>
          `error ... (${getError.response.status} $
          {getError.response.statusText})`
        </h2>
      )}

      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <form onSubmit={savePost}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              제목
            </label>
            <input
              value={fieldValues.title}
              onChange={handleFieldChange}
              name="title"
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            ></input>
            {saveErrorMessages.title?.map((message) => (
              <p className="text-red-400">{message}</p>
            ))}
          </div>
          <div className="form-group mb-6">
            <textarea
              onChange={handleFieldChange}
              value={fieldValues.content}
              name="content"
              className="
              h-96
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
            {saveErrorMessages.content?.map((message) => (
              <p className="text-red-400">{message}</p>
            ))}
          </div>

          <button
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

export default BlogForm;
