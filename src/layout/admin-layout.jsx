import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "/src/assets/gg.png";
import "./admin-style.css";
import helper from "../lib/helper";

export function AdminLayout() {
    const navigate =useNavigate();

    const handleLogoutClick = async (e) => {
        try {
            if(sessionStorage.getItem("access_token")) {
                sessionStorage.removeItem("access_token");
                navigate("/login")
                helper.toast("success", "Admin logout successfully")
            } else {
                setTimeout(() => {
                    navigate("/login")
                }, [1000])
            }
        } catch(error) {
            helper.toast("error", error?.response?.data?.message);
        }
    }

    return (
        <div>
            <h4 className="admin-heading">Admin Pannle</h4>
            <div className="d-flex">
                <div className="py-2 nav-style">
                        <div className="pb-2 d-flex justify-content-center">
                            <img src={logo} className="logo-style" />
                        </div>
                        <ul className="list-unstyled py-1">
                            <Link className="link-style" to="dashboard">
                            <li className="py-2 ps-4 nav-list">
                                <span className="bi bi-grid-1x2-fill"></span> Dashboard 
                            </li>
                            </Link>
                            <Link className="link-style" to="gallery">
                            <li className="py-2 ps-4 nav-list">
                                <span className="bi bi-camera-fill"></span> Gallery 
                            </li>
                            </Link>
                        </ul>
                        <div className="logout-style">
                            <button className="btn btn-danger" onClick={handleLogoutClick}>
                                Logout
                            </button>
                        </div>
                </div>
                <div className="py-3 outlet-style">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}