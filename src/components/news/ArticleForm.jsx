import { useApiAxios } from 'api/base';
import useFieldValues from 'components/hooks/useFieldValues';
import LoadingIndicator from 'components/LoadingIndicator';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import H2 from 'components/H2';
import { useEffect } from 'react/cjs/react.development';
import produce from 'immer';

// 함수 안에서는 새로운 객체 생성 최소화
const INIT_FIELD_VALUES = { title: '', content: '' };

// !articleId : 생성
// articleId : 수정
function ArticleForm({ articleId, handleDidSave }) {
  const [{ data: article, loading: getLoading, error: getError }] = useApiAxios(
    `/news/api/articles/${articleId}/`,
    { manual: !articleId },
  );

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: `/news/api/articles/${!articleId ? '' : articleId + '/'}`,
      method: !articleId ? 'POST' : 'PATCH',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues, formData } =
    useFieldValues(article || INIT_FIELD_VALUES);

  useEffect(() => {
    // 11: 30 => 수정시에 photo error
    // 서버로 photo=null이 전달이 되면, 아래 오류가 발생
    //   - The submitted data was not a file. Check the encoding type on the form.
    //   - 대응 : fieldValues에서 photo만 제거해주거나, photo=null이라면 빈 문자열로 변경

    // setFieldValues((prevFieldValues) => ({
    //   ...prevFieldValues,
    //   photo: '',
    // }));

    // setFieldValues((prevFieldValues) =>
    //    produce(prevFieldValues, (draft) => {
    //     draft.photo = '';
    //   })

    setFieldValues(
      produce((draft) => {
        draft.photo = '';
      }),
    );
  }, [article]);

  const handleSubmit = (e) => {
    e.preventDefault();

    saveRequest({
      data: formData,
    }).then((response) => {
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
          {saveErrorMessages?.title?.map((message, index) => (
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
          {saveErrorMessages?.content?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={handleFieldChange}
          />
          {saveErrorMessages?.photo?.map((message, index) => (
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
        article={article}
        getLoading={getLoading}
        getError={getError}
        fieldValues={fieldValues}
        saveError={saveError}
        saveLoading={saveLoading}
        saveErrorMessages={saveErrorMessages}
      />
    </div>
  );
}

export default ArticleForm;
