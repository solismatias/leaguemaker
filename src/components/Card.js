import React, { useState } from 'react'
import { StatsBar } from '../components/StatsBar'
import { HeroInfo } from './HeroInfo'

const Card = ({ hero, heroTeam, setHeroTeam }) => {
    const [openInfo, setOpenInfo] = useState(false)
    const maxStat = 100
    return (
        <div className="card" >
            <button className="card__info-button">
                <i className="fas fa-info-circle" onClick={() => setOpenInfo(true)} />
            </button>
            <div className="hero__portrait">
                <img className="hero__img" src={hero.image.url} alt="hero"></img>
            </div>
            <p className="hero__name">{hero.name}</p>
            <div className="hero__stats">
                <p>Intelligence</p>
                <StatsBar key={hero.id} statNumber={hero.powerstats.intelligence} total={maxStat} />
            </div>
            <div className="hero__stats">
                <p>strength</p>
                <StatsBar key={hero.id} statNumber={hero.powerstats.strength} total={maxStat} />
            </div>
            <div className="hero__stats">
                <p>speed</p>
                <StatsBar key={hero.id} statNumber={hero.powerstats.speed} total={maxStat} />
            </div>
            <div className="hero__stats">
                <p>durability</p>
                <StatsBar key={hero.id} statNumber={hero.powerstats.durability} total={maxStat} />
            </div>
            <div className="hero__stats">
                <p>power</p>
                <StatsBar key={hero.id} statNumber={hero.powerstats.power} total={maxStat} />
            </div>
            <div className="hero__stats">
                <p>combat</p>
                <StatsBar key={hero.id} statNumber={hero.powerstats.combat} total={maxStat} />
            </div>
            <HeroInfo open={openInfo} hero={hero} key={hero.id} onClose={() => setOpenInfo(false)} heroTeam={heroTeam} setHeroTeam={setHeroTeam} />
        </div>
    )
}

export { Card }
