import { Routes, Route } from "react-router-dom";
// Layout
import AuthLayout from "./Layout/auth/AuthLayout";

// Pages
import Login from "./pages/auth/Login";
import RecoverPassword from "./pages/auth/RecoverPassword";
import ChangePassword from "./pages/auth/ChangePassword";

import Error404 from "./pages/404";
import Dashboard from "./pages/auth/dashboard";

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
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="" element={<Error404 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
