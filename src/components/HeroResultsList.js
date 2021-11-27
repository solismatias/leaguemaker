import React from 'react'
import { HeroDetails } from "./HeroDetails"

const HeroResultsList = ({ hero, setOpenDetails, openDetails, handleAdd }) => {



    return (
        <>
            <div className="results__item" >
                <div className="results__img">
                    <img className="result-hero__img" alt="hero result" src={hero.image.url} />
                </div>
                <i className="fas fa-info-circle results__info-button" onClick={() => setOpenDetails(!openDetails)} />
                <p className="results__name">{hero.name}</p>
                <i className="fas fa-plus results__plus" onClick={() => handleAdd(hero)}></i>
            </div>
            {openDetails ? <HeroDetails hero={hero} /> : null}
        </>
    )
}

export { HeroResultsList }
