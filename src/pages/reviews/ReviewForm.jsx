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
  const [loading, setLoading] = useState(false);
  const [fieldValues, handleFieldChange, emptyFieldValues, setFieldValues] =
    useFieldValues(INITIAL_STATE);

  // 훅에 지정하는 함수는 async일 수 없다
  useEffect(() => {
    const fetchReview = async () => {
      const url = `http://localhost:8000/shop/api/reviews/${reviewId}/`;
      setLoading(true);
      setError(null);

      try {
        const response = await Axios.get(url);
        setFieldValues(response.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
      setError(null);
    };
    if (reviewId) {
      fetchReview();
    } else {
      emptyFieldValues();
    }
  }, [reviewId, setFieldValues, emptyFieldValues]);

  const submitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = !reviewId
      ? 'http://127.0.0.1:8000/shop/api/reviews/'
      : `http://localhost:8000/shop/api/reviews/${reviewId}/`;

    try {
      !reviewId
        ? await Axios.post(url, fieldValues)
        : await Axios.put(url, fieldValues);
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
        handleChange={handleFieldChange}
        fieldValues={fieldValues}
        submitReview={submitReview}
        loading={loading}
      />
    </div>
  );
}

export default PageReviewForm;
