import { Routes, Route } from "react-router-dom";
import Post from "./components/post.jsx";
import Settings from "./pages/sittings.jsx";
import ChangeEmail from "./pages/changeEmail.jsx";
import ChangePassword from "./pages/changePassword.jsx";
import Search from "./pages/search.jsx";
import EditProfile from "./pages/editProfile.jsx";

import Login from './pages/login.jsx'
import Feed from './pages/feed.jsx'
import Profile from './pages/profile.jsx'

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/email" element={<ChangeEmail />} />
      <Route path="/settings/password" element={<ChangePassword />} />


    </Routes>
  )
}

export default App
