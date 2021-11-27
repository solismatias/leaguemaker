import React, { useState } from 'react'
// libraries
import { useFormik } from "formik"
import * as Yup from "yup"
// components
import { HeroResultsList } from './HeroResultsList'
// utils
import { getHeroesApi } from '../utils/getHeroesApi'
// images
// import cat from "../img/r2.jpg"
// styles
import "./HeroSearcher.css"

const HeroSearcher = ({ setHeroTeam, heroTeam, open, onClose, averages }) => {
    const [openDetails, setOpenDetails] = useState(false) // we will use this hook to display additional info of the hero 
    const [heroNotFound, setHeroNotFound] = useState(false) // We will use this hook to display an error message when we cannot find a hero.
    const [heroResults, setHeroResults] = useState()  // store the founded heroes
    const [heroesBadStats, setHeroesBadStats] = useState(false) // to display an error message when we already have 3 bad heroes
    const [heroesGoodStats, setHeroesGoodStats] = useState(false) // to display an error message when we already have 3 good heroes
    const [heroAlreadyTeam, setHeroAlreadyTeam] = useState(false) // to display an error message when we try to add the same hero 2 times
    const [apiError, setApiError] = useState(false)

    let heroBadStats = 0
    let heroGoodStats = 0

    heroTeam.map(hero => {
        let totalStats = 0
        Object.entries(hero.powerstats).forEach(([key, value]) => {
            totalStats += Number(value)
        })
        if (totalStats > 300) {
            return heroGoodStats += 1
        }
        return heroBadStats += 1
    })


    const handleAdd = (hero) => {

        // 1) we check if the hero that we are trying to add is already in the team
        let isHeroInTeam = false
        heroTeam.forEach(heroInTeam => {
            if (heroInTeam.id === hero.id) {
                return isHeroInTeam = true
            }
        })
        if (isHeroInTeam) {
            return setHeroAlreadyTeam(true)
        } else {
            setHeroAlreadyTeam(false)
        }

        // 2) we can only have 3 heroes with bad stats and 3 with bad stats, so we check that
        let heroTotalStats = 0  // we will add all the powerstats here, if it have more than 300, it will be good stats
        Object.entries(hero.powerstats).forEach(([key, value]) => {
            heroTotalStats += Number(value)
        })
        if (heroTotalStats > 300 && heroGoodStats === 3) {
            return setHeroesGoodStats(true) //if our hero have good stats and we already have 3 heroes in the team with good stats, we will display an error message
        } else if (heroTotalStats < 300 && heroBadStats === 3) {
            return setHeroesBadStats(true) //if our hero have bad stats and we already have 3 heroes in the team with bad stats, we will display an error message
        }
        setHeroesBadStats(false)
        setHeroesGoodStats(false)

        // 3) add the searched hero to the team list
        setHeroTeam(heroTeam => [...heroTeam, hero]);


        // 4) after we add a hero to the team, we have to delete that hero from the search results
        const heroIndex = heroResults.findIndex(heroToDelete => heroToDelete.id === hero.id) // to find the index of the hero
        const newHeroResults = [...heroResults]
        newHeroResults.splice(heroIndex, 1) // indicate the position of the hero that we will eliminate from search results
        setHeroResults(newHeroResults)
        averages()
    }

    const nullVerification = (heroes) => {
        // the API has a lot of null values, so here  we will make some corrections

        // assign a value of 20 for every "null" value in powerstats
        heroes.forEach(hero => {
            let power = hero.powerstats
            Object.entries(power).forEach(([key, value]) => {
                if (value === "null") {
                    power[key] = 20
                }
            })

            // replace value in height and weight
            if (hero.appearance.height[1] === "0 cm") {
                hero.appearance.height[1] = "175 cm"
            }
            if (hero.appearance.weight[1] === "0 kg") {
                hero.appearance.weight[1] = "80 kg"
            }


        })
    }

    const formik = useFormik({
        initialValues: {
            hero: "",
        },
        validationSchema: Yup.object({
            hero: Yup.string().max(30, "Must be 30 characters or less").min(1, "At least 1 are characters requiered").required("A valid hero name must be provided"),
        }),
        onSubmit: (values) => {
            async function getHero() {
                try {
                    let response = await getHeroesApi(values.hero) // we make a GET request to the API with the hero we are looking for
                    if (response === false) {
                        setHeroNotFound(true) // status of the petition, if we get an error, we will display a "Hero Not Found" message 
                    } else {
                        const heroesFound = response.data.results // here we keep all the heroes found, even heroes we already have in our hero team
                        setHeroNotFound(false)
                        nullVerification(heroesFound) // to fix "null" values
                        setHeroResults(heroesFound)
                        setApiError(false)
                    }
                } catch (error) {
                    console.error(error)
                    setApiError(true)
                }
            }
            getHero()
        }
    })

    if (!open) return null
    return (
        <div className="herofinder__overlay">
            <div className="herofinder">
                <i className="fas fa-times" onClick={onClose} />
                <p className="title herofinder__title">Find a hero</p>
                <form className="searchbar" onSubmit={formik.handleSubmit}>
                    <div className="searchbar__field">
                        <i className="fas fa-pen"></i>
                        <input
                            className="searchbar__input"
                            name="hero"
                            autoComplete="off"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.hero}
                        />
                    </div>
                    <button className="herofinder__button" type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
                {formik.touched.hero && formik.errors.hero ? <p className="herofinder__error-msg">{formik.errors.hero}</p> : null}
                <div className="herofinder__informative">
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>you can add up to 6 members, <br /> you have to add 3 heroes with bad stats and 3 with good stats </p>
                </div>

                {heroNotFound ?
                    <div className="herofinder__informative informative-error">
                        <i className="fas fa-exclamation-triangle"></i>
                        <p>Hero Not Found</p>
                    </div>
                    :
                    null
                }

                <div className="herofinder__added-heroes">
                    <p>Total: {heroBadStats + heroGoodStats}/6</p>
                    <p>Bad Stats: {heroBadStats}/3</p>
                    <p>Good Stats: {heroGoodStats}/3</p>
                </div>

                {heroesGoodStats ? <p className="herofinder__error-msg">your team already have 3 heroes with good stats</p> : null}
                {heroesBadStats ? <p className="herofinder__error-msg">your team already have 3 heroes with bad stats</p> : null}
                {heroAlreadyTeam ? <p className="herofinder__error-msg">your team already have that hero</p> : null}
                {apiError ? <p className="herofinder__error-msg">An error from the API has occurred, please reload the page</p> : null}

                <div className="results">
                    {heroResults ?
                        heroResults.map((hero) => {
                            return <HeroResultsList hero={hero} setOpenDetails={setOpenDetails} openDetails={openDetails} handleAdd={handleAdd} key={hero.id} />
                        })
                        :
                        null}

                </div>
            </div>
        </div>
    )
}

export { HeroSearcher }
