import Axios from 'axios';
import { useEffect, useState } from 'react';

import DebugStates from 'components/DebugStates';

function PageReviewList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);

    const url = 'http://127.0.0.1:8000/shop/api/reviews/';

    // Promise 객체
    // 상태코드 400 이상이면 오류 처리 이하면 정상 처리 => axios 자동 처리
    Axios.get(url)
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

  return (
    <div>
      <h2>Review List</h2>

      {loading && <div>Loading ...</div>}
      {error && <div>통신 중에 오류가 발생했습니다.</div>}

      <button
        onClick={() => refetch()}
        className="bg-yellow-400 hover:bg-red-400"
      >
        RELOAD
      </button>
      {reviewList.map((review) => {
        return (
          <div key={review.id}>
            <h2>{review.content}</h2>
          </div>
        );
      })}
      <hr />
      <DebugStates loading={loading} error={error} reviewList={reviewList} />
    </div>
  );
}

export default PageReviewList;
