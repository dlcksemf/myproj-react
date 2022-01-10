function BlogDetail({ post, loading }) {
  return (
    <div>
      {loading && <h2>loading...</h2>}
      {!loading && <h2 className="text-lg m-2">{post.title}</h2>}
      {post.content}
    </div>
  );
}

export default BlogDetail;
