// https://tailwindcomponents.com/component/tailwind-css-cards

import { useApiAxios } from 'api/base';
import ErrorWarning from 'components/ErrorWarning';
import LoadingIndicator from 'components/LoadingIndicator';
import { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

const MessageContext = createContext();

function reducer(prevState, action) {
  const { type } = action;
  switch (type) {
    case 'SHOW':
      return !prevState;
    default:
      return prevState;
  }
}

function BlogList() {
  const [{ data: postList, loading, error }, refetch] =
    useApiAxios(`/blog/api/posts/`);
  const navigate = useNavigate();
  const [showToast, dispatch] = useReducer(reducer, false);

  useEffect(() => {
    refetch();
  }, []);

  if (showToast)
    toast('🦄 Wow so easy!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {loading && <LoadingIndicator />}

      {error && (
        <ErrorWarning
          title="Error during Load"
          content={`${error.response.status} ${error.response.statusText}`}
        />
      )}

      {postList &&
        postList.map(({ title, content, id }) => (
          <MessageContext.Provider value={{ showToast, dispatch }}>
            <section className="pt-5 pb-2 bg-[#F3F4F6]" key={id}>
              <div className="container">
                <div className="flex flex-wrap mx-4">
                  <div className="w-full px-4">
                    <div
                      onClick={() => {
                        navigate(`/blog/${id}/`);
                      }}
                      className="bg-white rounded-lg overflow-hidden mb-10 cursor-pointer"
                    >
                      <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                        <div
                          className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                          {title}
                        </div>

                        <p className="text-base text-body-color leading-relaxed mb-7">
                          {content.length > 50
                            ? content.substring(0, 50) + '...'
                            : content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </MessageContext.Provider>
        ))}
    </div>
  );
}

export default BlogList;
