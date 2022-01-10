import BlogForm from 'components/blog/BlogForm';
import useFieldValues from 'components/hooks/useFieldValues';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PageBlogForm() {
  const navigate = useNavigate();

  const [fieldValues, handleFieldChange, emptyFieldValues, setFieldValues] =
    useFieldValues({ content: '', title: '' });

  const submitReview = (e) => {
    e.preventDefault();

    const url = 'http://localhost:8000/blog/api/posts/';

    Axios.post(url, fieldValues)
      .then(() => {
        navigate('/blog/');
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
      <BlogForm
        submitReview={submitReview}
        handleChange={handleFieldChange}
        fieldValues={fieldValues}
      />
    </div>
  );
}

export default PageBlogForm;
