import { useApiAxios } from 'api/base';
import useFieldValues from 'components/hooks/useFieldValues';
import LoadingIndicator from 'components/LoadingIndicator';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import H2 from 'components/H2';

const INIT_FIELD_VALUES = { title: '', content: '' };

// !articleId : 생성
// articleId : 수정
function ArticleForm({ articleId, handleDidSave }) {
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);
  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: '/news/api/articles/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    saveRequest({ data: fieldValues }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  return (
    <div className="my-2">
      {saveLoading && <LoadingIndicator>Saving ...</LoadingIndicator>}
      {saveError &&
        `Error during save. (${saveError.response.status} ${saveError.response.statusText})`}

      <H2>Article Form</H2>

      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            type="text"
            name="title"
            value={fieldValues.title}
            onChange={handleFieldChange}
            className="p-1 bg-gray-100  w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
          {saveErrorMessages.title?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            className="p-1 bg-gray-100 w-full h-80 outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
          {saveErrorMessages.content?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <Button>Save</Button>
        </div>
      </form>

      <DebugStates
        fieldValues={fieldValues}
        saveError={saveError}
        saveLoading={saveLoading}
        saveErrorMessages={saveErrorMessages}
      />
    </div>
  );
}

export default ArticleForm;
