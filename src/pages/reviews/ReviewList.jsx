import { useEffect, useState } from 'react';

import DebugStates from 'components/DebugStates';
import Review from 'components/Review';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from 'api/base';
import LoadingIndicator from 'components/LoadingIndicator';

function PageReviewList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);

    const url = `/shop/api/reviews/`;

    // Promise 객체
    // 상태코드 400 이상이면 오류 처리 이하면 정상 처리 => axios 자동 처리
    axiosInstance
      .get(url)
      .then(({ data }) => {
        setReviewList(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteReview = (deletingReview) => {
    const { id: deletingReviewId } = deletingReview;
    const url = `/shop/api/reviews/${deletingReviewId}/`;

    setError(null);
    setLoading(true);

    axiosInstance
      .delete(url)
      .then(() => {
        // 선택지 #1) 삭제된 항목만 상탯값에서 제거
        setReviewList((prevReviewList) =>
          prevReviewList.filter((review) => review.id !== deletingReviewId),
        );

        // 선택지 #2) 전체를 새로고침
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Review List</h2>

      {loading && <LoadingIndicator />}
      {error && <div>통신 중에 오류가 발생했습니다.</div>}

      <button
        onClick={() => refetch()}
        className="mr-1 p-1 bg-yellow-400 hover:bg-red-400"
      >
        RELOAD
      </button>

      <button
        onClick={() => {
          navigate('/reviews/new/');
        }}
        className="p-1 bg-blue-400 hover:bg-slate-400"
      >
        New Review
      </button>

      <div className="">
        {reviewList.map((review) => (
          <Review
            key={review.id}
            review={review}
            handleDelete={() => deleteReview(review)}
            handleEdit={() => navigate(`/reviews/${review.id}/edit/`)}
          />
        ))}
      </div>

      <hr />
      <DebugStates loading={loading} error={error} reviewList={reviewList} />
    </div>
  );
}

export default PageReviewList;
