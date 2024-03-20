import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";



const Login = lazy(() => import("./pages/Login"));
const Forgot = lazy(() => import("./pages/forgot"));
const Dashboard=lazy(() => import("./pages/dashboard"));


function App() {
  const [user, setUser] = useState<boolean>(false);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(true);
      console.log(user);
    } else {
      setUser(false);
    }
  }, [user]);

  

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Auth */}
          <Route
          // element={<ProtectedRoute isAuthenticated={user ? false : true} />}
          >
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/" element={<Dashboard />} />

            // Afterlogin
            <Route path="*" element={<div>Page Not Found</div>} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

export default App;
