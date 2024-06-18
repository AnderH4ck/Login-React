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

import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route
            path="/restablecer-password/:token"
            element={<ChangePassword />}
          />
        </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Error404 />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
