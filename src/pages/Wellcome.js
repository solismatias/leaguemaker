import React from "react"
// Libraries
import { Link } from "react-router-dom"
//components
import { InfoCard } from "../components/InfoCard"
// images
import logotxt from "../img/logotxt.svg"
import bat from "../img/bat.svg"
import stats from "../img/stat.svg"
import check from "../img/check.svg"
// styles
import "./Wellcome.css"


const Wellcome = () => {
    return (
        <>
            <nav className="navbar">
                <img src={logotxt} alt="logo league maker" />
            </nav>
            <main className="main">
                <section className="main__section">
                    <InfoCard image={bat} txt={"Create a team of superheroes to your pleasing"} />
                    <InfoCard image={check} txt={"Find the perfect combination of powers"} />
                    <InfoCard image={stats} txt={"Inspect the general characteristics of your team"} />
                </section>
                <Link to="/login"><button className="button button--homepage">Log In</button></Link>
            </main>
        </>
    )
}

export { Wellcome }
