import React from 'react';
import './Chessboard.css'
function Chessboard() {
    const horizontalAxis = ['a','b','c','d','e','f','g','h'];
    const verticalAxis = ['1', '2','3','4','5','6','7','8'];
    let board = [];
    for(let i=verticalAxis.length-1; i>=0; i--){
        for(let j=0; j<horizontalAxis.length; j++){
            if((i+j)%2){
                board.push(<div className="box white-tile" key={(i+1)*10 + (j+1)}>[{verticalAxis[i]}{horizontalAxis[j]}]</div>);
            }else{
                board.push(<div className="box black-tile" key={(i+1)*10 + (j+1)}>[{verticalAxis[i]}{horizontalAxis[j]}]</div>);
            }
        }
    }
    return(
        <div className="backboard"> 
            {board}
        </div>
    )
}

export default Chessboard;