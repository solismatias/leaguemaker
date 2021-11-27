import React from "react"
const InfoCard = (props) => {
    return (
        <div className="main__item">
            <img className="main__img" src={props.image} alt="batman" />
            <p className="main__text">{props.txt}</p>
        </div>
    )
}

export { InfoCard }
