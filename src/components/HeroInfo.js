import React from 'react'
import "./HeroInfo.css"


const HeroInfo = ({ open, onClose, hero, heroTeam, setHeroTeam }) => {

    const haveGoodStats = () => {
        let totalStats = 0
        Object.entries(hero.powerstats).forEach(([key, value]) => {
            totalStats += Number(value)
        })
        if (totalStats > 300) {
            return ("good")
        }
        return ("bad")
    }


    const deleteHero = () => {
        let heroIndex = heroTeam.findIndex(heroToDelete => heroToDelete.id === hero.id)
        let newHeroTeam = [...heroTeam]
        newHeroTeam.splice(heroIndex, 1)
        setHeroTeam(newHeroTeam)
    }
    if (!open) return null
    return (
        <div className="heroinfo__overlay">
            <div className="heroinfo">
                <i className="fas fa-times" onClick={onClose}></i>
                <div className="heroinfo__info-container">
                    <p className="heroinfo__p">Name: {hero.biography["full-name"]}</p>
                    <p className="heroinfo__p">Alias: {hero.biography.aliases[0]}</p>
                    <p className="heroinfo__p">Weight: {hero.appearance.weight[1]}</p>
                    <p className="heroinfo__p">Height: {hero.appearance.height[1]}</p>
                    <p className="heroinfo__p">Eyes Color: {hero.appearance["eye-color"]}</p>
                    <p className="heroinfo__p">Hair Color: {hero.appearance["hair-color"]}</p>
                    <p className="heroinfo__p">Work Place: {hero.work.base}</p>
                    <p className="heroinfo__p">Stats: {haveGoodStats()}</p>
                </div>
                <button className="button heroinfo__button" onClick={deleteHero}>Delete</button>
            </div>
        </div>
    )
}

export { HeroInfo }
