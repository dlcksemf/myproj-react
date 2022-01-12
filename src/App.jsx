import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from 'pages/accounts/Login';
import Profile from 'pages/accounts/Profile';
import PageReviewList from 'pages/reviews/ReviewList';
import TopNav from 'components/TopNav';
import Components from 'pages/examples/Components';
import ReviewForm from 'pages/reviews/ReviewForm';
import PageBlogList from 'pages/blog/PageBlogList';
import PageBlogDetail from 'pages/blog/PageBlogDetail';
import PageBlogForm from 'pages/blog/PageBlogForm';
import Clock from 'pages/examples/Clock';
import useWindowWidth from 'components/hooks/useWindowWidth';
import CssModule from 'pages/examples/CssModule';
import CssInJs from 'pages/examples/CssInJs';
import ContextApiSample from 'pages/examples/ContextApiSample';
import ContextApiSample2 from 'pages/examples/ContextApiSample2';
import PageNewsIndex from 'pages/news/PageNewsIndex';
import PageNewsArticleDetail from 'pages/news/PageNewsArticleDetail';

function App() {
  const windowWidth = useWindowWidth();
  return (
    <>
      <div className="app">
        <TopNav />
        <Routes>
          <Route path="/" element={<Navigate to="/news/" />} />

          <Route path="/accounts/login/" element={<Login />} />
          <Route path="/accounts/profile/" element={<Profile />} />

          <Route path="/blog/" element={<PageBlogList />} />
          <Route path="/blog/:postId/" element={<PageBlogDetail />} />
          <Route path="/blog/new/" element={<PageBlogForm />} />
          <Route path="/blog/:postId/edit/" element={<PageBlogForm />} />

          <Route path="/news/" element={<PageNewsIndex />} />
          <Route path="/news/:articleId/" element={<PageNewsArticleDetail />} />

          <Route path="/reviews/" element={<PageReviewList />} />
          <Route path="/reviews/new/" element={<ReviewForm />} />
          <Route path="/reviews/:reviewId/edit/" element={<ReviewForm />} />

          <Route path="/examples/components/" element={<Components />} />
          <Route path="/examples/css-module/" element={<CssModule />} />
          <Route path="/examples/css-in-js/" element={<CssInJs />} />
          <Route path="/examples/context-api/" element={<ContextApiSample />} />
          <Route
            path="/examples/context-api-2/"
            element={<ContextApiSample2 />}
          />
        </Routes>
        <hr />
        윈도우 가로크기 : {windowWidth}px
      </div>
      <Routes>
        <Route path="/examples/clock/" element={<Clock />} />
      </Routes>
    </>
  );
}

export default App;
