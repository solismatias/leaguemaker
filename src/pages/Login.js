import React, { useState } from "react"
// Libraries
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
// images
import logotxt from "../img/logotxt.svg"
// styles
import "./Login.css"


const Login = () => {
    const [loginError, setLoginError] = useState(false) // I use this hook to decide when to render a login error message
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email adress").max(30, "Must be 30 characters or less").required("A valid email must be provided"),
            password: Yup.string().max(15, "Must be 15 characters or less").required("A valid password must be provided")
        }),
        onSubmit: (values) => {
            async function getToken() {
                try {
                    // let URL = "http://challenge-react.alkemy.org/"
                    let URL = "https://cors-everywhere.herokuapp.com/http://challenge-react.alkemy.org/" // to fix CORS policy and Mixed Content issue
                    let response = await axios.post(URL, {
                        // email: "challenge@alkemy.org",
                        // password: "react"
                        email: formik.values.email,
                        password: formik.values.password
                    })
                    let token = response.data.token
                    localStorage.setItem("userToken", token)
                    setLoginError(false)
                    navigate("/home")
                } catch (error) {
                    setLoginError(true) // if we get an error while login, we set this hook to true, so we can display the error message
                }
            }
            getToken()
        }
    })
    return (
        <>
            <div>
                <nav className="navbar">
                    <img src={logotxt} alt="logo league maker" />
                </nav>
                <Link to="/">
                    <button className="button back-button"><i className="fas fa-arrow-left"></i></button>
                </Link>
                <section className="wellcome">
                    <h1 className="wellcome__title">Hello!</h1>
                    <p className="wellcome__text">Log in to your account</p>
                </section>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <div className="form__field">
                        <i className="far fa-user" />
                        <input
                            className="form__input"
                            placeholder="email"
                            type="email"
                            name="email"
                            autoComplete="on"
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? <p className="form__error-msg">{formik.errors.email}</p> : null} {/* if we have some kind of error in the email field, it will be rendered here */}
                    <div className="form__field">
                        <i className="fas fa-lock"></i>
                        <input
                            className="form__input"
                            placeholder="password"
                            type="password"
                            name="password"
                            autoComplete="off"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.touched.password && formik.errors.password ? <p className="form__error-msg">{formik.errors.password}</p> : null} {/* if we have some kind of error in the password field, it will be rendered here */}
                    {loginError ? <p className="form__error-msg">Unauthorized: Incorrect user email or password</p> : null} {/* if loginError is true, an error message will be displayed */}
                    <button className="button button--homepage" type="submit">log in</button>
                </form>
                <div className="login__info">
                    <p>For reasons of this challenge, these are the only valid data to log in</p>
                    <ul className="login__ul">
                        <li>Email: challenge@alkemy.org</li>
                        <li>Password: react</li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export { Login }

