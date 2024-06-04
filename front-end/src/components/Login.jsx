import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  const handleSubmitLogin = e => {
    e.preventDefault();
    axios
      .get(`/sanctum/csrf-cookie`)
      .then(() => axios.post(`/login`, formData))
      .then(() => axios.get("/api/user"))
      .then(res => {
        dispatch(login(res.data));
        console.log(res.data);
        navigate("/");
      })
      .catch(err => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };
  return (
    <>
      {errors && (
        <div class="alert alert-danger" role="alert">
          {errors.email && errors.email[0]}
        </div>
      )}
      <h1 className="text-center">Login</h1>
      <form onSubmit={e => handleSubmitLogin(e)} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={e => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
            value={formData.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={e => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
            value={formData.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
