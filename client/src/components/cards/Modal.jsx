import React from "react";

function Modal(musicObject,open){
    if(!open) return null;
    return(
        <div className='overlay'>
            <div className='modalContainer'>
                <div className= 'modalRight'>
                    <p className='closeBtn'>X</p>
                    <div className='content'>
                        <h3>Title: {musicObject.title}</h3>
                        <h3> Artist: {musicObject.artist}</h3>
                        <h3> Label: {musicObject.label}</h3>
                        <h3> Country: {musicObject.country}</h3>
                        <h3> Year: {musicObject.year}</h3>
                        <h3> format: {musicObject.format}</h3>
                    </div>
                    <div className="btnContainer">
                        <button className='btnPrimary'>
                            <span className='bold'>YES</span>,Add it
                        </button>
                        <button className='btnOutline'>
                            <span className='bold'>NO</span>, check again.
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Modal;