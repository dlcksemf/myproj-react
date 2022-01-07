import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from 'pages/accounts/Login';
import Profile from 'pages/accounts/Profile';
import ReviewList from 'pages/reviews/ReviewList';
import TopNav from 'components/TopNav';

function App() {
  return (
    <div className="app">
      <TopNav />
      <Routes>
        <Route path="/" element={<div>welcome</div>} />
        <Route path="/accounts/login/" element={<Login />} />
        <Route path="/accounts/profile/" element={<Profile />} />
        <Route path="/reviews/" element={<ReviewList />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
