import React, { useState } from "react";
import "../Styles/Login.css";
import logo from "../Images/logo1.png";
import axios from "axios";
import Loader from "../Components/Loader"
import { useNavigate } from "react-router-dom";
function Admin() {
    const [loader,setLoader]= useState("none")
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [forgotClicked, setForgotClicked] = useState(false);
    const [email, setEmail] = useState("");
    const [enteredotp, setEnteredotp] = useState("");
    const [showOTPForm, setShowOTPForm] = useState(false);
    const navigate = useNavigate();

    const forgot = async () => {
        setForgotClicked(true);
    };
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            setLoader("");
            const response = await axios.post(`${process.env["REACT_APP_backendbaseurl"]}/api/forgotpassword`, { email });
            const { success, message } = response.data;
            if (success) {
                alert(message);
                setShowOTPForm(true);
                setLoader("none")
            } else {
                alert(message);
                navigate("/")
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred while processing your request.");
        }
    };

    const submitAdmin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env["REACT_APP_backendbaseurl"]}/api/adminlogin`, { name, password });
            const { success, message, token } = response.data;
            if (success) {
                alert(message);
                if (token) {
                    sessionStorage.setItem("token", token);
                }
                navigate("/adminconsole");
            } else {
                alert(message);
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred while logging in.");
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        console.log(enteredotp);
        try {
            const response = await axios.post(`${process.env["REACT_APP_backendbaseurl"]}/api/verifyotp`, { enteredotp });
            const { success, message,token } = response.data;
            setLoader("");
            if (success) {
                alert(message);
                setLoader("none")
                if (token) {
                    sessionStorage.setItem("token", token);
                    navigate("/adminconsole");
                }
                else{
                    alert("Authorisation Token not found")
                }
                navigate("/adminconsole");
            } else {
                alert(message);
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred while verifying OTP.");
        }
    };

    return (
        <div
            style={{
                backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
                position: "absolute",
                height: "100vh",
                left: "0",
                width: "100%",
                overflow: "hidden",
            }}
        >

            <Loader display = {loader}/>
            {!forgotClicked ? (
                <div className="wrapper" style={{ marginTop: "150px" }}>
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <div className="text-center mt-4 name">Admin Login</div>
                    <form className="p-3 mt-3" method="post" onSubmit={submitAdmin}>
                        <div className="form-field d-flex align-items-center">
                            <span className="far fa-user"></span>
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                placeholder="Username"
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </div>
                        <div className="form-field d-flex align-items-center">
                            <span className="fas fa-key"></span>
                            <input
                                type="password"
                                name="password"
                                id="pwd"
                                placeholder="Password"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>
                        <button className="btn mt-3" type="submit">Login</button>
                    </form>
                    <div className="text-center fs-6">
                        <a style={{color:"blue"}} onClick={forgot}>Forgot password?</a>
                    </div>
                </div>
            ) : (
                <div className="wrapper" style={{ marginTop: "150px" }}>
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <div className="text-center mt-4 name">Forgot Password</div>
                    <form className="p-3 mt-3" onSubmit={handleForgotPassword}>
                        <div className="form-field d-flex align-items-center">
                            <span className="far fa-envelope"></span>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className="btn mt-3" type="submit">Recover Password</button>
                    </form>
                    {showOTPForm && (
                        <form className="p-3 mt-3" onSubmit={handleVerifyOTP}>
                            <div className="form-field d-flex align-items-center">
                                <span className="fas fa-key"></span>
                                <input
                                    type="text"
                                    name="otp"
                                    id="otp"
                                    placeholder="Enter OTP received in email"
                                    onChange={(e) => setEnteredotp(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-outline-warning mt-3" type="submit">Verify OTP</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}

export default Admin;
