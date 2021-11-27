import React from 'react'
import { StatsBar } from './StatsBar'


const TeamStats = ({ heroes }) => {

    const maxStat = 600

    let intelligence = 0
    let strength = 0
    let speed = 0
    let durability = 0
    let power = 0
    let combat = 0


    heroes.forEach(hero => {
        intelligence += Number(hero.powerstats.intelligence)
        strength += Number(hero.powerstats.strength)
        speed += Number(hero.powerstats.speed)
        durability += Number(hero.powerstats.durability)
        power += Number(hero.powerstats.power)
        combat += Number(hero.powerstats.combat)
    })



    return (
        <>
            <div className="team__stats">
                <p>intelligence</p>
                <StatsBar statNumber={intelligence} total={maxStat} />
            </div>
            <div className="team__stats">
                <p>strength</p>
                <StatsBar statNumber={strength} total={maxStat} />
            </div>
            <div className="team__stats">
                <p>speed</p>
                <StatsBar statNumber={speed} total={maxStat} />
            </div>
            <div className="team__stats">
                <p>durability</p>
                <StatsBar statNumber={durability} total={maxStat} />
            </div>
            <div className="team__stats">
                <p>power</p>
                <StatsBar statNumber={power} total={maxStat} />
            </div>
            <div className="team__stats">
                <p>combat</p>
                <StatsBar statNumber={combat} total={maxStat} />
            </div>
        </>
    )
}

export { TeamStats }

