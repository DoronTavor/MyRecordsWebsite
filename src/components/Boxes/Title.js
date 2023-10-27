import React from "react";
import TitleDesign from "styles/TitleDesign.css"
function title(props){
    return (
        <div >
            <h1 className={"centeredName"}> Name:{props.name}</h1>
            <h2 className={"centeredArtist"}> Artist:{props.artist}</h2>
            <h2 className={"centeredFormat"}> Format: {props.format}</h2>
            <h3 className={"year"}>Year: {props.year}</h3>
            <h2 className={"centeredArtist"}> Label:{props.label}</h2>
            <h2 className={"centeredCountry"}> Country:{props.country} </h2>
        </div>
    );
}

export default title;