import React from "react";
import CustomList from "./CustomList.css";

function SongCard(props){
    return (
      <div>
          <h1>{props.name}</h1>
          <h2>Duration:{props.duration}</h2>
      </div>
    );
}
export default SongCard;