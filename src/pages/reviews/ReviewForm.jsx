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
  const [fieldValues, handleChange, emptyFieldValues, setFieldValues] =
    useFieldValues(INITIAL_STATE);

  // 다양한 함수를 정의
  useEffect(() => {
    if (reviewId) {
      const url = `http://localhost:8000/shop/api/reviews/${reviewId}/`;
      Axios.get(url)
        .then(({ data }) => setFieldValues(data))
        .catch((error) => setError(error));
    } else {
      setFieldValues(INITIAL_STATE);
    }
  }, [reviewId]);

  const submitReview = async (e) => {
    e.preventDefault();

    const newUrl = 'http://127.0.0.1:8000/shop/api/reviews/';
    const editUrl = `http://localhost:8000/shop/api/reviews/${reviewId}/`;

    if (!reviewId) {
      try {
        const response = await Axios.post(newUrl, fieldValues);
        navigate('/reviews/');
      } catch (error) {
        setError(error);
      } finally {
        emptyFieldValues();
      }
    } else {
      try {
        const response = await Axios.put(editUrl, fieldValues);
        navigate('/reviews/');
      } catch (error) {
        setError(error);
      } finally {
        emptyFieldValues();
      }
    }
  };

  // 표현 by jsx -> 별도의 컴포넌트로 구분
  return (
    <div>
      <h2>Review Form</h2>

      <ReviewForm
        handleChange={handleChange}
        fieldValues={fieldValues}
        submitReview={submitReview}
      />
    </div>
  );
}

export default PageReviewForm;
