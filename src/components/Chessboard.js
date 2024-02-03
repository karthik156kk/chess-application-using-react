import React from 'react';
import Tile from './Tile';
import './Chessboard.css';
import Referee from '../referee/referee.js';
import {useRef, useEffect, useState} from 'react';

export const pieceType = Object.freeze({
    PAWN: 1,
    BISHOP: 2,
    KNIGHT: 3,
    ROOK: 4,
    KING:5,
    QUEEN: 6
})

export const pieceTeam = Object.freeze({
    OPPONENT: 0,
    OUR: 1
})

const initialSetup = [];
for(let p=0; p<2; p++){
    const teamType = p===0 ? pieceTeam.OUR : pieceTeam.OPPONENT;
    const type = (teamType === pieceTeam.OUR) ? 'w' : 'b';
    const y = (p === pieceTeam.OUR) ? 8 : 1;

    initialSetup.push({image: `/assets/images/rook_${type}.png`, x:1, y, type: pieceType.ROOK, team: teamType});
    initialSetup.push({image: `/assets/images/rook_${type}.png`, x:8, y, type: pieceType.ROOK, team: teamType});
    initialSetup.push({image: `/assets/images/knight_${type}.png`, x:2, y, type: pieceType.KNIGHT, team: teamType});
    initialSetup.push({image: `/assets/images/knight_${type}.png`, x:7, y, type: pieceType.KNIGHT, team: teamType});
    initialSetup.push({image: `/assets/images/bishop_${type}.png`, x:3, y, type: pieceType.BISHOP, team: teamType});
    initialSetup.push({image: `/assets/images/bishop_${type}.png`, x:6, y, type: pieceType.BISHOP, team: teamType});
    initialSetup.push({image: `/assets/images/queen_${type}.png`, x:4, y, type: pieceType.QUEEN, team: teamType});
    initialSetup.push({image: `/assets/images/king_${type}.png`, x:5, y, type: pieceType.KING, team: teamType});
}
for(let k=1; k<=8; k++){
    initialSetup.push({image: '/assets/images/pawn_b.png', x:k, y:7, type: pieceType.PAWN, team: pieceTeam.OPPONENT});
    initialSetup.push({image: '/assets/images/pawn_w.png', x:k, y:2, type: pieceType.PAWN, team: pieceTeam.OUR});
}

function Chessboard() {
    const forReference = useRef(null);
    const [pieces, setPieces] = useState(initialSetup);
    const [activePiece, setActivePiece] = useState(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);

    const referee = new Referee();

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
            board.push(<Tile num={key} flag={flag} image={pieceImg} key={key}/>);
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
            
            // if(x<minX || x>maxX || y<minY-50 || y>maxY+50){
            //     activePiece.style.position = 'relative';
            //     activePiece.style.removeProperty('top');
            //     activePiece.style.removeProperty('left');
            //     setActivePiece(null);
            // }
        }
    }
    const dropElement = (e)=>{
        const currentBoard = forReference.current;
        if(activePiece){
            const x = Math.floor((e.clientX - currentBoard.offsetLeft)/75) + 1;
            const y = Math.abs(Math.ceil((e.clientY - currentBoard.offsetTop - 600)/75) - 1);
            
            //Snaps the pieces to new position
            setPieces((prevPieces)=>{
                const newPieces = prevPieces.map((p)=>{
                    if(p.x ===gridX && p.y===gridY){
                        const validCheck = referee.evalIsValidMove(gridX, gridY, x, y, p.type, p.team, prevPieces);
                        if(validCheck){
                            p.x = x;
                            p.y = y;
                        }
                        else{
                            activePiece.style.position = 'relative';
                            activePiece.style.removeProperty('top');
                            activePiece.style.removeProperty('left');
                        }
                    }
                    return p;
                })
                return newPieces;
            })
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