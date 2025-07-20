import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authModel from "../../models/auth.model";
import helper from "../../lib/helper";

export function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSignInClick = async (e) => {
    e.preventDefault();

    if (!e.target.email.value || !e.target.password.value) {
      helper.toast("error", "Please enter email and password");
      return;
    }

    try {
      const res = await authModel.login(formData);
      if (res) {
        // sessionStorage.setItem("access_token", res.data.token);
        helper.toast("success", "Admin login successfully");
        navigate("/admin/dashboard"); 
      } 
      else {
        helper.toast("error", "Login failed: No token received");
      }
    } catch (error) {
      console.log(error,"+++++++++++++++++")
      helper.toast(
        "error",
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="Container-fluid">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="border rounded"
          style={{
            height: "340px",
            width: "400px",
            backgroundColor: "lightgray",
          }}
        >
          <h3 className="text-center py-3 my-2 border-bottom border-success mx-3">
            Admin SignIn
          </h3>
          <div className="py-1">
            <div className="px-3 mt-4">
              <form onSubmit={handleSignInClick}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    id="usernameInput"
                    placeholder="name@gmail.com"
                  />
                  <label htmlFor="usernameInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    id="passwordInput"
                    placeholder="Enter Password"
                  />
                  <label htmlFor="passwordInput">Password</label>
                </div>
                <button className="btn btn-success w-100 p-2" type="submit">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
