import BlogList from 'components/blog/BlogList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogDeleteConfirm from 'components/blog/BlogDeleteConfirm';
import { axiosInstance } from 'api/base';
import useAxios from 'axios-hooks';
import { API_HOST } from 'Constants';

function PageBlog() {
  const [postList, setPostList] = useState([{ content: '', title: '' }]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const [{ data, loading, error }, reFetch] = useAxios(
    `${API_HOST}/blog/api/posts/`,
  );

  useEffect(() => {
    reFetch();
  }, []);

  useEffect(() => {
    setPostList(data || [{ content: '', title: '' }]);
  }, [data]);

  const deleteButtonClicked = () => {
    setShowDeleteConfirm(true);
  };

  const deletePost = (deletingPost) => {
    const { id: deletedPostId } = deletingPost;

    const url = `/blog/api/posts/${deletedPostId}`;

    axiosInstance
      .delete(url)
      .then(() => {
        setPostList((prevPostList) => {
          return prevPostList.filter((post) => deletedPostId !== post.id);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    setShowDeleteConfirm(false);
  };

  const cancleButtonClicked = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div>
      <button
        onClick={() => {
          navigate('/blog/new/');
        }}
        className="
          w-full
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
      >
        New Post
      </button>

      {postList.map((post) => {
        return (
          <>
            <BlogList
              post={post}
              navigate={navigate}
              key={post.id}
              handleDelete={() => deleteButtonClicked()}
            />
            {showDeleteConfirm && (
              <BlogDeleteConfirm
                key={post.id}
                deletePost={() => deletePost(post)}
                handleCancleButton={cancleButtonClicked}
              />
            )}
          </>
        );
      })}
    </div>
  );
}

export default PageBlog;
