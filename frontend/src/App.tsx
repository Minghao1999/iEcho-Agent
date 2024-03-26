// App.tsx
import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import { UserState } from "./types/user";
import Loading from "./components/loader/loading";

const Login = lazy(() => import("./pages/Login"));
const Forgot = lazy(() => import("./pages/forgot"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const FriendProfile = lazy(() => import("./pages/friendProfile"));

function App() {
  const [userstate, setUserState] = useState<boolean>(false);

  const { user, isLoading } = useSelector(
    (state: { userReducer: UserState }) => state.userReducer
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserState(true);
    }
  }, [user]);

  return isLoading ? (
    <Loading />
  ) : (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            element={
              <ProtectedRoute isAuthenticated={!userstate} redirect="/" />
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute isAuthenticated={userstate} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friend" element={<FriendProfile />} />
          </Route>

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

export default App;
