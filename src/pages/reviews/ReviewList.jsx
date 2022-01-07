import Axios from 'axios';
import { useEffect, useState } from 'react';

import DebugStates from 'components/DebugStates';

function PageReviewList() {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    const url = 'http://127.0.0.1:8000/shop/api/reviews/';

    // Promise 객체
    // 상태코드 400 이상이면 오류 처리 이하면 정상 처리 => axios 자동 처리
    Axios.get(url)
      .then(({ data }) => {
        console.group('normal response');
        console.log(data);
        console.groupEnd();

        setReviewList(data);
      })
      .catch((error) => {
        console.group('error response');
        console.log(error);
        console.groupEnd();
      });
  };

  return (
    <div>
      <h2>Review List</h2>

      {reviewList.map((review) => {
        return (
          <div key={review.id}>
            <h2>{review.content}</h2>
          </div>
        );
      })}

      <hr />
      <DebugStates reviewList={reviewList} />
    </div>
  );
}

export default PageReviewList;
