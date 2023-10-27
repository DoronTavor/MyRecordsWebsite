import React from "react";
import CustomList from "../cards/CustomList.css";
import SongCard from "../cards/SongCard";
function TrackList(props){
    console.log(props.TrackList);
    let trackList=props.TrackList;

    return (
        <ul className="custom-list">
            {trackList.map((item, index) => (
                <li key={index} className="custom-list-item" data-custom-marker={item.position.substring(0, 2)+"  "}>
                    <div>
                        <SongCard name={item.title.split('=')[0]} duration={item.duration}></SongCard>
                    </div>
                </li>
            ))}
        </ul>
    );
}
export default TrackList;