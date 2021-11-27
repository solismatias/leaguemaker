import React from "react";
import "./StatsBar.css"
const StatsBar = ({ statNumber, total }) => {


    let widthPercent = statNumber

    if (total === 600) {
        widthPercent = Math.floor(statNumber / 6)
    }

    return (
        <>
            <div className="statsBar">
                <div className="statsBar__filler" style={{ width: widthPercent + '%' }} />
            </div>
            <span className="statsBar__label">{`${statNumber}/${total}`}</span>
        </>
    );
};

export { StatsBar };