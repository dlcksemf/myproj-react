import BlogForm from 'components/blog/BlogForm';
import useFieldValues from 'components/hooks/useFieldValues';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function PageBlogForm() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [fieldValues, handleFieldChange, emptyFieldValues, setFieldValues] =
    useFieldValues({ content: '', title: '' });

  useEffect(() => {
    const url = `http://localhost:8000/blog/api/posts/${postId}/`;

    const getData = () => {
      Axios.get(url)
        .then(({ data }) => {
          setFieldValues(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    !postId ? emptyFieldValues() : getData();
  }, [postId]);

  const submitReview = (e) => {
    e.preventDefault();

    const url = !postId
      ? 'http://localhost:8000/blog/api/posts/'
      : `http://localhost:8000/blog/api/posts/${postId}/`;

    if (!postId) {
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
    } else {
      Axios.patch(url, fieldValues)
        .then(() => {
          navigate('/blog/');
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          emptyFieldValues();
        });
    }
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
