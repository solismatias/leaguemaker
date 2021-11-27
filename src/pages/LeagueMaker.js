import React, { useEffect, useState } from 'react'
// libraries
import { useNavigate } from 'react-router'
// import axios from 'axios'
// components
import { Card } from '../components/Card'
import { HeroSearcher } from '../components/HeroSearcher'
import { TeamStats } from '../components/TeamStats'

// images
import logo from "../img/logo.svg"
// styles
import "./LeagueMaker.css"


const LeagueMaker = () => {
    let navigate = useNavigate();
    // hooks to open or close menus
    const [openSearch, setOpenSearch] = useState(false)
    // const [openInfo, setOpenInfo] = useState(false)
    const [heroTeam, setHeroTeam] = useState([])  // to store the added heroes


    // the useEffect will run every time this page is rendered
    // here we will check if we have the access token
    useEffect(() => {
        let token = localStorage.getItem("userToken")
        if (!token) {
            navigate("/login") // if we dont have the token, we will be redirected to the login screen
        }
    })

    const averages = (value) => {
        let averageHeight = 0
        let averageWeight = 0
        let teamNumber = 0
        if (value === "height") {
            heroTeam.forEach(hero => {
                let heroHeight = hero.appearance.height[1].slice(0, -2) // here we get the heigth in cm
                heroHeight.slice(0, -2) // it will return "180 cm" so we elimiante the "cm" with slice
                averageHeight += Number(heroHeight) // we convert the result to a number
                teamNumber++
            })
            if (teamNumber === 0) return 0
            return Math.floor(averageHeight / teamNumber)
        } else {
            heroTeam.forEach(hero => {
                // and we have to do almos the same procees for weight
                let heroWeight = hero.appearance.weight[1].slice(0, -2)
                heroWeight.slice(0, -2)
                averageWeight += Number(heroWeight)
                teamNumber++
            })
            if (teamNumber === 0) return 0
            return Math.floor(averageWeight / teamNumber)
        }
    }

    const highestStat = () => {
        let statsPower = [0, 0, 0, 0, 0, 0]
        let temp = 0
        heroTeam.forEach(hero => {
            statsPower[0] += Number(hero.powerstats.intelligence)
            statsPower[1] += Number(hero.powerstats.strength)
            statsPower[2] += Number(hero.powerstats.speed)
            statsPower[3] += Number(hero.powerstats.durability)
            statsPower[4] += Number(hero.powerstats.power)
            statsPower[5] += Number(hero.powerstats.combat)
            temp++
        })

        if (temp === 0) {
            return "category"
        }

        let largestNum = statsPower.reduce(function (accumulatedValue, currentValue) {
            return Math.max(accumulatedValue, currentValue);
        })
        let indexHero = statsPower.findIndex(stat => stat === largestNum)
        switch (indexHero) {
            case 0:
                return "Intelligence"
            case 1:
                return "Strength"
            case 2:
                return "Speed"
            case 3:
                return "Durability"
            case 4:
                return "Power"
            case 5:
                return "Combat"
            default: return "nada"
        }
    }


    return (
        <>
            <img className="logo" src={logo} alt="logo league maker" />
            <header className="header">
                <p className="title">Your Team</p>
                <span className="header__span">{highestStat()}</span>
            </header>
            <section className="hero">
                {heroTeam ?
                    heroTeam.map((hero) => {
                        return (
                            <Card hero={hero} key={hero.id} heroTeam={heroTeam} setHeroTeam={setHeroTeam} />
                        )
                    })
                    :
                    null}
                {heroTeam.length < 6 ?
                    <div className="card">
                        <i className="fas fa-plus card__plus" onClick={() => setOpenSearch(true)} />
                    </div>
                    :
                    null}
            </section>
            <section className="powerstats">
                <p className="title header">Team stats</p>
                <div className="team-stats__container">
                    <TeamStats heroes={heroTeam} />
                </div>
            </section>
            <section className="averages">
                <p className="averages__title">Averages</p>
                <div className="averages__info">
                    <p className="averages__p">weight: {averages("weight")} kg</p>
                    <p className="averages__p">height: {averages("height")} cm</p>
                </div>
            </section>
            <HeroSearcher setHeroTeam={setHeroTeam} heroTeam={heroTeam} open={openSearch} onClose={() => setOpenSearch(false)} averages={averages} />
        </>
    )
}

export { LeagueMaker }
