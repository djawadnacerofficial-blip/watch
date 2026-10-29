import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute, { GuestRoute } from "./components/ProtectedRoute.jsx";
import Settings from "./pages/sittings.jsx";
import ChangeEmail from "./pages/changeEmail.jsx";
import ChangePassword from "./pages/changePassword.jsx";
import Search from "./pages/search.jsx";
import EditProfile from "./pages/editProfile.jsx";
import Login from "./pages/login.jsx";
import Feed from "./pages/feed.jsx";
import Profile from "./pages/profile.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/email" element={<ChangeEmail />} />
          <Route path="/settings/password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
