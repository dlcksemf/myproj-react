import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useFieldValues from 'components/hooks/useFieldValues';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReviewForm from 'components/ReviewForm';

const INITIAL_STATE = { content: '', score: 0 };

function PageReviewForm() {
  // 상탯값 정의, 훅 호출
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fieldValues, handleChange, emptyFieldValues, setFieldValues] =
    useFieldValues(INITIAL_STATE);

  // 훅에 지정하는 함수는 async일 수 없다
  useEffect(() => {
    const fn = async () => {
      const url = `http://localhost:8000/shop/api/reviews/${reviewId}/`;
      setLoading(true);
      setError(null);

      if (reviewId) {
        try {
          const response = await Axios.get(url);
          setFieldValues(response.data);
        } catch (error) {
          setError(error);
        }
      } else {
        setFieldValues(INITIAL_STATE);
      }

      setLoading(false);
      setError(null);
    };
    fn();
  }, [reviewId, setFieldValues]);

  const submitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newUrl = 'http://127.0.0.1:8000/shop/api/reviews/';

    try {
      const response = !reviewId
        ? await Axios.post(newUrl, fieldValues)
        : await Axios.put(
            `http://localhost:8000/shop/api/reviews/${reviewId}/`,
            fieldValues,
          );
      navigate('/reviews/');
    } catch (error) {
      setError(error);
    }
    setError(null);
    setLoading(false);
    emptyFieldValues();
  };

  // 표현 by jsx -> 별도의 컴포넌트로 구분
  return (
    <div>
      <h2>Review Form</h2>

      <ReviewForm
        handleChange={handleChange}
        fieldValues={fieldValues}
        submitReview={submitReview}
        lodaing={loading}
      />
    </div>
  );
}

export default PageReviewForm;
