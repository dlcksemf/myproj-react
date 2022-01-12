// https://tailwindcomponents.com/component/avatar-ui-design

import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useApiAxios } from 'api/base';
import BlogDeleteConfirm from './BlogDeleteConfirm';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorWarning from 'components/ErrorWarning';
import MessageContext from './BlogList';

function BlogDetail({ postId }) {
  const { dispatch } = useContext(MessageContext);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [{ data: post, loading, error }, refetch] = useApiAxios(
    `/blog/api/posts/${postId}/`,
  );

  const [{ loading: deleteLoading, error: deleteError }, deletingPost] =
    useApiAxios(
      { url: `/blog/api/posts/${postId}/`, method: 'DELETE' },
      { manual: true },
    );
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const deletePost = () => {
    deletingPost().then(() => {
      dispatch({ type: 'SHOW' });
      navigate('/blog/');
      setConfirmDelete(false);
    });
  };

  const handleCancleButton = () => {
    setConfirmDelete(false);
  };

  return (
    <>
      {loading && <LoadingIndicator />}
      {error && (
        <ErrorWarning
          title="Error during Load"
          content={`${error.response.status} ${error.response.statusText}`}
        />
      )}

      {deleteLoading && <LoadingIndicator>deleting ...</LoadingIndicator>}
      {deleteError && (
        <ErrorWarning
          title="Error during Delete"
          content={`${deleteError.response.status} ${deleteError.response.statusText}`}
        />
      )}

      {confirmDelete && (
        <BlogDeleteConfirm
          deletePost={deletePost}
          handleCancleButton={handleCancleButton}
        />
      )}
      <div className="flex justify-center items-center rounded grid md:grid-cols-2 grid-cols-1 shadow-2xl bg-slate-800 xl:w-4/5 md:w-full md:h-4/5 h-full w-96 text-center text-sm rounded-sm">
        <div className="px-3">
          <img src="https://placeimg.com/640/480/tech" alt="tech photos" />

          <div
            onClick={() => {
              navigate(`/blog/${post.id}/edit/`);
            }}
            className="
            bg-gray-200
            inline-block
            py-2
            px-7
            border border-[#E5E7EB]
            rounded-full
            text-base text-body-color
            font-medium
            hover:border-primary hover:bg-primary hover:text-white
            transition
            mx-1
            my-3
            cursor-pointer
            "
          >
            EDIT
          </div>
          <div
            onClick={handleDelete}
            disabled={deleteLoading}
            className="
            bg-gray-200
            inline-block
            py-2
            px-7
            border border-[#E5E7EB]
            rounded-full
            text-base text-body-color
            font-medium
            hover:border-primary hover:bg-primary hover:text-white
            transition
            mx-1
            my-3
            cursor-pointer
            "
          >
            DELETE
          </div>

          <div
            onClick={() => navigate('/blog/')}
            className="my-5 cursor-pointer transition-all duration-150 hover:bg-green-500 bg-green-400 md:px-12  sm:px-10 sm:py-3 px-8 py-2 text-center rounded-full md:text-xl text-md text-my-color font-medium"
          >
            Back to List
          </div>
        </div>

        {post && (
          <div className="bg-my-color text-white w-full h-full flex justify-center items-center px-3 py-4 text-center">
            <div className="h-full px-8 text-gray-100 lg:text-lg">
              <div className="font-sans md:mb-3 mb-2">
                <h2 className="uppercase font-medium">{post.title}</h2>
              </div>
              <p className="lg:text-md text-sm">{post.content}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BlogDetail;
