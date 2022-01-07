import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from 'pages/accounts/Login';
import Profile from 'pages/accounts/Profile';
import PageReviewList from 'pages/reviews/ReviewList';
import TopNav from 'components/TopNav';
import Components from 'pages/examples/Components';
import ReviewForm from 'pages/reviews/ReviewForm';

function App() {
  return (
    <div className="app">
      <TopNav />
      <Routes>
        <Route path="/" element={<Navigate to="/reviews/" />} />
        <Route path="/accounts/login/" element={<Login />} />
        <Route path="/accounts/profile/" element={<Profile />} />
        <Route path="/reviews/" element={<PageReviewList />} />
        <Route path="/reviews/new/" element={<ReviewForm />} />
        <Route path="/examples/components/" element={<Components />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
