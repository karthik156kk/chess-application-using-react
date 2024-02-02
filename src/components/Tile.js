import React from 'react'
import './Tile.css';

function Tile(props) {
    if(props.flag%2===0){
        return(
            <div className = 'tile tile-black' key={props.num}>
               {props.image && <div className = 'chessPiece' style={{backgroundImage: `url(${props.image})`}}></div>}
                {/* <img src = {props.image} className="chess-piece-image"></img> */}
            </div>
        )
    }else{
        return(
            <div className = 'tile tile-white' key={props.flag}>
                {props.image && <div className = 'chessPiece' style={{backgroundImage: `url(${props.image})`}} ></div>}
                {/* <img src = {props.image} className="chess-piece-image"></img> */}
            </div>
        )
    }
}
export default Tile
