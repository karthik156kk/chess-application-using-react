import React from 'react';
import Tile from './Tile';
import './Chessboard.css';
function Chessboard() {
    const horizontalAxis = ['a','b','c','d','e','f','g','h'];
    const verticalAxis = ['1', '2','3','4','5','6','7','8'];
    let board = [];

    const pieces = [];
    for(let p=0; p<2; p++){
        const type = p===0 ? 'w' : 'b';
        const y = p === 0 ? 1 : 8;

        pieces.push({image: `/assets/images/rook_${type}.png`, x:1, y});
        pieces.push({image: `/assets/images/rook_${type}.png`, x:8, y});
        pieces.push({image: `/assets/images/knight_${type}.png`, x:2, y});
        pieces.push({image: `/assets/images/knight_${type}.png`, x:7, y});
        pieces.push({image: `/assets/images/bishop_${type}.png`, x:3, y});
        pieces.push({image: `/assets/images/bishop_${type}.png`, x:6, y});
        pieces.push({image: `/assets/images/queen_${type}.png`, x:4, y});
        pieces.push({image: `/assets/images/king_${type}.png`, x:5, y});
    }
    for(let k=1; k<=8; k++){
        pieces.push({image: '/assets/images/pawn_b.png', x:k, y:7});
        pieces.push({image: '/assets/images/pawn_w.png', x:k, y:2});
    }
    for(let i=verticalAxis.length-1; i>=0; i--){
        for(let j=0; j<horizontalAxis.length; j++){
            const flag = i+j;
            const key=(i+1)*10 + (j+1);
            let pieceImg = undefined;
            pieces.forEach((p)=>{
                if((p.y*10 + p.x === key)){
                    pieceImg = p.image;
                }
            })
            board.push(<Tile num={key} flag={flag} image={pieceImg}/>);
        }
    }
    let activePiece = null;
    const grabElement = (e)=>{
        const element = e.target;
        if(element.classList.contains('chessPiece')){
            const x = e.clientX - 50;
            const y = e.clientY -50;
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            activePiece = element;
        }
    }
    const moveElement = (e)=>{
        if(activePiece){
            const x = e.clientX - 50;
            const y = e.clientY -50;
            activePiece.style.position = 'absolute';
            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
        }
    }
    const dropElement = (e)=>{
        if(activePiece){
            activePiece = null;
        }
    }
    return(
        <div className="backboard" onMouseDown={grabElement} onMouseMove={moveElement} onMouseUp={dropElement}> 
            {board}
        </div>
    )
}

export default Chessboard;