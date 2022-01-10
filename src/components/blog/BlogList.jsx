function BlogList({ post, navigate }) {
  const { title, content } = post;

  // TODO : image / button 기능 구현 / style로 content 말줄임
  return (
    <div>
      <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="bg-white rounded-lg overflow-hidden mb-10">
                {/* <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-02.jpg"
                  alt="image"
                  className="w-full"
                /> */}
                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3
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
                    {content}
                  </p>

                  {/* 수정 / 삭제 버튼 */}
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
                     "
                    onClick={() => {
                      navigate(`/blog/${post.id}/edit/`);
                    }}
                  >
                    EDIT
                  </div>
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
