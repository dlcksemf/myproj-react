import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import H2 from 'components/H2';
import useFieldValues from 'components/hooks/useFieldValues';
import useAxios from 'axios-hooks';
import { API_HOST } from 'Constants';
import LoadingIndicator from 'components/LoadingIndicator';
import { useNavigate } from 'react-router-dom';

// 함수 안에서는 새로운 객체 생성 최소화
const INIT_FIELD_VALUES = { title: '', content: '' };

function PageNewsArticleForm() {
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);
  const navigate = useNavigate();
  const [{ loading: saveLoading, error: saveError }, saveRequest] = useAxios(
    {
      url: `${API_HOST}/news/api/articles/`,
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    saveRequest({ data: fieldValues }).then((response) => {
      const savedPost = response.data;
      navigate(`/news/${savedPost.id}`);
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
        </div>

        <div className="my-3">
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            className="p-1 bg-gray-100 w-full h-80 outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
        </div>

        <div className="my-3">
          <Button>Save</Button>
        </div>
      </form>

      <DebugStates
        fieldValues={fieldValues}
        saveError={saveError}
        saveLoading={saveLoading}
      />
    </div>
  );
}

export default PageNewsArticleForm;
