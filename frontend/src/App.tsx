// App.tsx
import axios from "axios";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loading from "./components/loader/loading";
import ProtectedRoute from "./components/protectedRoute";
import { resetUser, setUser } from "./redux/reducer/userReducer";
import { User } from "./types/api";
import { UserState } from "./types/user";
import { server } from "./redux/store";

const Login = lazy(() => import("./pages/Login"));
const Forgot = lazy(() => import("./pages/forgot"));
const ResetPassword = lazy(() => import("./pages/reset"));

const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const FriendProfile = lazy(() => import("./pages/friendProfile"));

function App() {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector(
    (state: { userReducer: UserState }) => state.userReducer
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${server}/api/v1/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data.data as User;
          dispatch(setUser({ user: data }));
        } else {
          dispatch(resetUser());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(resetUser());
      }
    };

    fetchUserData();
  }, [dispatch]);

  return isLoading ? (
    <Loading />
  ) : (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={!user ? true : false}
                redirect="/"
              />
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
          <Route path="/reset/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
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
