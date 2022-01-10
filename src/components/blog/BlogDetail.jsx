import DebugStates from 'components/DebugStates';

function BlogDetail({ post, loading }) {
  const { title } = post;

  return (
    <div>
      {loading && <h2>loading...</h2>}
      {!loading && <h2>{title}</h2>}
      <DebugStates post={post} />
    </div>
  );
}

export default BlogDetail;
