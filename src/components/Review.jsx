import Rating from './Rating';

// review : 보여직 리뷰 객체
// handleDelete : 인자없는 함수, 삭제 버튼 클릭 시에 호출을 합니다.

function Review({ review, handleEdit, handleDelete }) {
  const { content, score } = review;

  // TODO: handleEdit / handleDelete 호출에 대한 방어적 코드를 작성해주세요.
  const handleClickedDeleteButton = () => {
    if (!handleDelete) {
      console.warn('[Review] handleDelete 속성값이 지정되지 않았습니다.');
    } else handleDelete();
  };

  const handleClickedEditButton = () => {
    if (!handleEdit) {
      console.warn('[Review] handleChange 속성값이 지정되지 않았습니다.');
    } else handleEdit();
  };

  return (
    <div className="bg-yellow-100 border border-yellow-400 my-1 p-1">
      <div>
        <span
          onClick={handleClickedEditButton}
          className="mr-1 hover:text-blue-400 cursor-pointer"
        >
          수정
        </span>
        <span
          onClick={handleClickedDeleteButton}
          className="hover:text-red-400 cursor-pointer"
        >
          삭제
        </span>
      </div>
      {content}
      <Rating score={score} />
    </div>
  );
}

export default Review;
