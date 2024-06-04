import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_img: "",
  });

  const [errors, setErrors] = useState(null);

  const handleSubmitRegister = e => {
    e.preventDefault();
    axios
      .get(`/sanctum/csrf-cookie`)
      .then(() => {
        const body = new FormData();
        body.append("name", data.name);
        body.append("email", data.email);
        body.append("password", data.password);
        body.append("password_confirmation", data.password_confirmation);
        if (profileImage) {
          body.append("profile_img", profileImage);
        }

        return axios.post(`/register`, body);
      })
      .then(() => axios.get("/api/user"))
      .then(res => {
        dispatch(login(res.data));
        navigate("/");
      })
      .catch(err => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <>
      {/* {errors && <div class="alert alert-danger" role="alert">
  
</div>} */}
      <h1 className="text-center">Registrazione</h1>
      <form onSubmit={e => handleSubmitRegister(e)} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={e => {
              setData({
                ...data,
                name: e.target.value,
              });
            }}
            value={data.name}
          />
          {errors && errors.name && <div className="error text-danger">{errors.name}</div>}
        </div>
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
              setData({
                ...data,
                email: e.target.value,
              });
            }}
            value={data.email}
          />
          {errors && errors.email && <div className="error text-danger">{errors.email}</div>}
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
              setData({
                ...data,
                password: e.target.value,
              });
            }}
            value={data.password}
          />
          {errors && errors.password && <div className="error text-danger">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Conferma Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password_confirmation"
            name="password_confirmation"
            onChange={e => {
              setData({
                ...data,
                password_confirmation: e.target.value,
              });
            }}
            value={data.password_confirmation}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profile_img" className="form-label">
            Profile Image
          </label>
          <input
            className="form-control"
            type="file"
            id="profile_img"
            name="profile_img"
            onChange={e => {
              setData({
                ...data,
                profile_img: e.target.value,
              });
              setProfileImage(e.target.files[0]);
            }}
            value={data.profile_img}
          />
          {errors && errors.profile_img && <div className="error text-danger">{errors.profile_img}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
