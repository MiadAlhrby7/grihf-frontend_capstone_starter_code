import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home/Home";
import Appointments from "./pages/Appointments";
import InstantAppointments from "./pages/InstantAppointments";
import SelfCheckUp from "./pages/SelfCheckUp/SelfCheckUp";
import HealthBlog from "./pages/HealthBlog/HealthBlog";
import ReviewsFinal from "./pages/Reviews/ReviewsFinal";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Report from "./pages/Reports/Report";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="instantappointments" element={<InstantAppointments />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="selfcheckup" element={<SelfCheckUp />} />
        <Route path="healthblog" element={<HealthBlog />} />
        <Route path="reviews" element={<ReviewsFinal />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="profile" element={<Profile />} />
        <Route path="reports" element={<Report/>} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
