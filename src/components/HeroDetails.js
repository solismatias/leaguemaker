import React from 'react'

const HeroDetails = ({ hero }) => {

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

    return (
        <div className="results__info">
            <p className="results__p">Stats: {haveGoodStats()}</p>
            <p className="results__p">Full Name: {hero.biography["full-name"]}</p>
            <p className="results__p">Intelligence: {hero.powerstats.intelligence}/100</p>
            <p className="results__p">strength: {hero.powerstats.strength}/100</p>
            <p className="results__p">speed: {hero.powerstats.speed}/100</p>
            <p className="results__p">durability: {hero.powerstats.durability}/100</p>
            <p className="results__p">power: {hero.powerstats.power}/100</p>
            <p className="results__p">combat: {hero.powerstats.combat}/100</p>
        </div>
    )
}

export { HeroDetails }
