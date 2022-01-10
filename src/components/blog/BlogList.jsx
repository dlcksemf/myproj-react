function BlogList({ post, navigate, handleDelete }) {
  const { title, content } = post;

  const handleDeleteButtonClicked = () => {
    if (handleDelete) {
      handleDelete();
    } else {
      console.error('handleDelete 함수 인자 없음');
    }
  };

  // TODO : image / style로 content 말줄임
  return (
    <div>
      <section className="pt-5 pb-2 bg-[#F3F4F6]">
        <div className="container">
          <div className="flex flex-wrap mx-4">
            <div className="w-full px-4">
              <div className="bg-white rounded-lg overflow-hidden mb-10">
                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(`/blog/${post.id}/`);
                    }}
                  >
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
                  </h3>
                  <p className="text-base text-body-color leading-relaxed mb-7">
                    {content.length > 50 ? content.substring(0, 50) + "..." : content}
                  </p>

                  <div
                    className="
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
                     "
                    onClick={() => {
                      navigate(`/blog/${post.id}/edit/`);
                    }}
                  >
                    EDIT
                  </div>
                  <div
                    onClick={handleDeleteButtonClicked}
                    className="
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
                     "
                  >
                    DELETE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogList;
