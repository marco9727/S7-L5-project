import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Login from "./components/Login";
import Register from "./components/Register";
import axios from "axios";
import Home from "./components/Home";
import CourseDetails from "./components/CourseDetails";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "./redux/actions";
import MyCourses from "./components/MyCourses";
import AdminCourses from "./components/AdminCourses";
import GuestRoutes from "./components/GuestRoutes";
import AuthRoutes from "./components/AuthRoutes";
import AdminRoutes from "./components/AdminRoutes";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("/api/user")
      .then(res => dispatch(login(res.data)))
      .catch(err => console.log(err))
      .finally(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <BrowserRouter>
        <MyNavbar />
        <div className="container">
          <Routes>
            {/* rotte accessibili da tutti */}
            <Route path="/" element={<Home />} />
            {/* rotte se non si è collegati */}
            <Route element={<GuestRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/* rotte accessibili solo se si è collegati */}
            <Route element={<AuthRoutes />}>
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/my_courses" element={<MyCourses />} />
            </Route>
            {/* rotte solo se si è collegati e si è admin */}
            <Route element={<AdminRoutes />}>
              <Route path="/admin/courses" element={<AdminCourses />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
  );
}

export default App;
