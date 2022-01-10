function BlogDetail({ post, loading }) {
  return (
    <div>
      {loading && <h2>loading...</h2>}
      <h2 className="text-lg m-2">{post.title}</h2>
      {post.content}

      <img src={"https://placeimg.com/640/480/tech"} />
    </div>
  );
}

export default BlogDetail;
