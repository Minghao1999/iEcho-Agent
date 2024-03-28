// App.tsx
import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import { UserState } from "./types/user";
import Loading from "./components/loader/loading";
import axios from "axios";
import { setUser } from "./redux/reducer/userReducer";

const Login = lazy(() => import("./pages/Login"));
const Forgot = lazy(() => import("./pages/forgot"));
const ResetPassword = lazy(() => import("./pages/reset"));

const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const FriendProfile = lazy(() => import("./pages/friendProfile"));

function App() {
  const [userstate, setUserState] = useState<boolean>(false);
  const dispatch =useDispatch()

  const { user, isLoading } = useSelector(
    (state: { userReducer: UserState }) => state.userReducer
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get('http://127.0.0.1:5000/api/v1/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.data);
          dispatch(setUser(response.data.data));
          setUserState(true);
        } else {
          setUserState(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserState(false); 
      }
    };
  
    fetchUserData(); 
  
  }, [user,dispatch]); 

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
            <Route path="/reset/:token" element={<ResetPassword />} />

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
