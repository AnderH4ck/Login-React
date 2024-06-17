import { Routes, Route } from "react-router-dom";
// Layout
import AuthLayout from "./Layout/auth/AuthLayout";

// Pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import RecoverPassword from "./pages/auth/RecoverPassword";
import ChangePassword from "./pages/auth/ChangePassword";

import Error404 from "./pages/404";
import Dashboard from "./pages/auth/dashboard";

import ProtectedRoute from "./pages/auth/ProtectedRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="recover-password" element={<RecoverPassword />} />
        <Route
          path="restablecer-password/:token"
          element={<ChangePassword />}
        />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default App;
