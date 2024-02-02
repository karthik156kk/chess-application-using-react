import React from 'react';
import Tile from './Tile';
import './Chessboard.css';
import {useRef, useEffect, useState} from 'react';

const initialSetup = [];
for(let p=0; p<2; p++){
    const type = p===0 ? 'w' : 'b';
    const y = p === 0 ? 1 : 8;

    initialSetup.push({image: `/assets/images/rook_${type}.png`, x:1, y});
    initialSetup.push({image: `/assets/images/rook_${type}.png`, x:8, y});
    initialSetup.push({image: `/assets/images/knight_${type}.png`, x:2, y});
    initialSetup.push({image: `/assets/images/knight_${type}.png`, x:7, y});
    initialSetup.push({image: `/assets/images/bishop_${type}.png`, x:3, y});
    initialSetup.push({image: `/assets/images/bishop_${type}.png`, x:6, y});
    initialSetup.push({image: `/assets/images/queen_${type}.png`, x:4, y});
    initialSetup.push({image: `/assets/images/king_${type}.png`, x:5, y});
}
for(let k=1; k<=8; k++){
    initialSetup.push({image: '/assets/images/pawn_b.png', x:k, y:7});
    initialSetup.push({image: '/assets/images/pawn_w.png', x:k, y:2});
}

function Chessboard() {
    const forReference = useRef(null);
    const [pieces, setPieces] = useState(initialSetup);
    const [activePiece, setActivePiece] = useState(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);

    const horizontalAxis = ['a','b','c','d','e','f','g','h'];
    const verticalAxis = ['1', '2','3','4','5','6','7','8'];
    let board = [];

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
    const grabElement = (e)=>{
        const element = e.target;
        const currentBoard = forReference.current;
        if(element.classList.contains('chessPiece') && currentBoard){
            const gX = Math.floor((e.clientX - currentBoard.offsetLeft)/75) + 1;
            const gY = Math.abs(Math.ceil((e.clientY - currentBoard.offsetTop - 600)/75) - 1);
            setGridX(gX);
            setGridY(gY);
            //redundant
            // const x = e.clientX - 50;
            // const y = e.clientY -50;
            // element.style.position = 'absolute';
            // element.style.left = `${x}px`;
            // element.style.top = `${y}px`;
            setActivePiece(element);
        }
    }
    const moveElement = (e)=>{
        if(activePiece && forReference){
            const minX = forReference.current.offsetLeft - 10;
            const minY = forReference.current.offsetTop - 10;
            const maxX = forReference.current.clientWidth + minX - 60;
            const maxY = forReference.current.clientHeight + minY - 60;
            const x = e.clientX - 50;
            const y = e.clientY -50;
            activePiece.style.position = 'absolute';
            if(x < minX){
                activePiece.style.left = `${minX}px`;
            }else if(x > maxX){
                activePiece.style.left = `${maxX}px`;
            }else{
                activePiece.style.left = `${x}px`;
            }
            if(y < minY){
                activePiece.style.top = `${minY}px`;
            }else if(y > maxY){
                activePiece.style.top = `${maxY}px`;
            }else{
                activePiece.style.top = `${y}px`;
            }
        
        }
    }
    const dropElement = (e)=>{
        const currentBoard = forReference.current;
        if(activePiece){
            const x = Math.floor((e.clientX - currentBoard.offsetLeft)/75) + 1;
            const y = Math.abs(Math.ceil((e.clientY - currentBoard.offsetTop - 600)/75) - 1);
            console.log(`${x},${y} to ${gridX},${gridY}`);
            setPieces((prevPieces)=>{
                const newPieces = prevPieces.map((p)=>{
                    if(p.x ===gridX && p.y===gridY){
                        p.x = x;
                        p.y = y;
                    }
                    return p;
                })
                return newPieces;
            })
            console.log(pieces)
            setActivePiece(null);
        }
        
    }
    return(
        <div className="backboard" onMouseDown={grabElement} onMouseMove={moveElement} onMouseUp={dropElement} ref={forReference}> 
            {board}
        </div>
    )
}

export default Chessboard;