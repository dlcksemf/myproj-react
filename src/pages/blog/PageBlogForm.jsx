import BlogForm from 'components/blog/BlogForm';
import useFieldValues from 'components/hooks/useFieldValues';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { axiosInstance } from 'api/base';

function PageBlogForm() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [fieldValues, handleFieldChange, emptyFieldValues, setFieldValues] =
    useFieldValues({ content: '', title: '' });

  useEffect(() => {
    const url = `/blog/api/posts/${postId}/`;

    const getData = () => {
      axiosInstance
        .get(url)
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

    const url = !postId ? `/blog/api/posts/` : `/blog/api/posts/${postId}/`;

    if (!postId) {
      axiosInstance
        .post(url, fieldValues)
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
      axiosInstance
        .patch(url, fieldValues)
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
