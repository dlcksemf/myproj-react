import Axios from 'axios';
import { useEffect } from 'react';

function ReviewList() {
  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    const url = 'http://127.0.0.1:8000/shop/api/reviews/';

    // Promise 객체
    // 상태코드 400 이상이면 오류 처리 이하면 정상 처리 => axios 자동 처리
    Axios.get(url)
      .then((response) => {
        console.group('normal response');
        console.log(response);
        console.groupEnd();
      })
      .catch((error) => {
        console.group('error response');
        console.log(error);
        console.groupEnd();
      });
  };

  return (
    <div>
      <h2>hello</h2>
    </div>
  );
}

export default ReviewList;
