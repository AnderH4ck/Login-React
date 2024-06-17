import { Routes, Route } from "react-router-dom";
// Layout
import AuthLayout from "./Layout/auth/AuthLayout";

// Pages
import Login from "./pages/auth/Login";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ChangePassword from "./pages/auth/ChangePassword";

import Error404 from "./pages/404";
import Dashboard from "./pages/auth/dashboard";

import ProtectedRoute from "./pages/auth/ProtectedRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />

        <Route path="olvide-password" element={<ForgetPassword />} />
        <Route
          path="restablecer-password/:token"
          element={<ChangePassword />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default App;
