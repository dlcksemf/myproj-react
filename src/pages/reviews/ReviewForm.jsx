import { useNavigate } from 'react-router-dom';
import useFieldValues from 'components/hooks/useFieldValues';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReviewForm from 'components/ReviewForm';
import { axiosInstance } from 'api/base';

const INITIAL_STATE = { content: '', score: 0 };

function PageReviewForm() {
  // 상탯값 정의, 훅 호출
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { fieldValues, handleFieldChange, emptyFieldValues, setFieldValues } =
    useFieldValues(INITIAL_STATE);
  const [errorMessages, setErrorMessages] = useState({});

  // 훅에 지정하는 함수는 async일 수 없다
  useEffect(() => {
    const fetchReview = async () => {
      const url = `/shop/api/reviews/${reviewId}/`;
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(url);
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
    setErrorMessages({});

    const url = !reviewId
      ? `/shop/api/reviews/`
      : `/shop/api/reviews/${reviewId}/`;

    try {
      !reviewId
        ? await axiosInstance.post(url, fieldValues)
        : await axiosInstance.put(url, fieldValues);
      navigate('/reviews/');
    } catch (error) {
      setErrorMessages(error.response.data);
    }

    setLoading(false);
    emptyFieldValues();
  };

  // 표현 by jsx -> 별도의 컴포넌트로 구분
  return (
    <div>
      <h2>Review Form</h2>

      <ReviewForm
        errorMessages={errorMessages}
        handleChange={handleFieldChange}
        fieldValues={fieldValues}
        submitReview={submitReview}
        loading={loading}
      />
    </div>
  );
}

export default PageReviewForm;
