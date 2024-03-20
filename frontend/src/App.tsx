import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Forgot = lazy(() => import("./pages/forgot"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const FriendProfile = lazy(() => import("./pages/friendProfile"));

function App() {
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(true);
      console.log(user);
    } else {
      setUser(false);
    }
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route>
            <Route
              // element={<ProtectedRoute isAuthenticated={user ? false : true} />}
            >
              <Route path="/login" element={<Login />} />
              <Route path="/forgot" element={<Forgot />} />
            </Route>

            {/* Dashboard Access */}
            <Route
              // element={<ProtectedRoute isAuthenticated={user ? true : false} />}
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/friend" element={<FriendProfile />} />
            </Route>

            // Page not found
            <Route path="*" element={<div>Page Not Found</div>} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

export default App;
