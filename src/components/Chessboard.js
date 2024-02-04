import React from 'react';
import Tile from './Tile';
import './Chessboard.css';
import Referee from '../referee/referee.js';
import {useRef, useState} from 'react';
import {pieceType, pieceTeam, HORIZONTAL_AXIS, VERTICAL_AXIS, GRID_SIZE, isSamePosition} from './constants.js';

const initialSetup = [];
for(let p=0; p<2; p++){
    const teamType = p===0 ? pieceTeam.OUR : pieceTeam.OPPONENT;
    const type = (teamType === pieceTeam.OUR) ? 'w' : 'b';
    const y = (p === pieceTeam.OUR) ? 8 : 1;

    initialSetup.push({image: `/assets/images/rook_${type}.png`, position: {x:1, y}, type: pieceType.ROOK, team: teamType});
    initialSetup.push({image: `/assets/images/rook_${type}.png`, position: {x:8, y}, type: pieceType.ROOK, team: teamType});
    initialSetup.push({image: `/assets/images/knight_${type}.png`, position: {x:2, y}, type: pieceType.KNIGHT, team: teamType});
    initialSetup.push({image: `/assets/images/knight_${type}.png`, position: {x:7, y}, type: pieceType.KNIGHT, team: teamType});
    initialSetup.push({image: `/assets/images/bishop_${type}.png`, position: {x:3, y}, type: pieceType.BISHOP, team: teamType});
    initialSetup.push({image: `/assets/images/bishop_${type}.png`, position: {x:6, y}, type: pieceType.BISHOP, team: teamType});
    initialSetup.push({image: `/assets/images/queen_${type}.png`, position: {x:4, y}, type: pieceType.QUEEN, team: teamType});
    initialSetup.push({image: `/assets/images/king_${type}.png`, position: {x:5, y}, type: pieceType.KING, team: teamType});
}
for(let k=1; k<=8; k++){
    initialSetup.push({image: '/assets/images/pawn_b.png', position: {x:k, y:7}, type: pieceType.PAWN, team: pieceTeam.OPPONENT});
    initialSetup.push({image: '/assets/images/pawn_w.png', position: {x:k, y:2}, type: pieceType.PAWN, team: pieceTeam.OUR});
}

function Chessboard() {
    const forReference = useRef(null);
    const [pieces, setPieces] = useState(initialSetup);
    const [activePiece, setActivePiece] = useState(null);
    const [grabPosition, setGrabPosition] = useState({x:-1, y:-1});

    const referee = new Referee();
    let board = [];

    for(let i=VERTICAL_AXIS.length-1; i>=0; i--){
        for(let j=0; j<HORIZONTAL_AXIS.length; j++){
            const flag = i+j;
            const key=(i+1)*10 + (j+1);
            const piece = pieces.find(p => isSamePosition(p.position, {x:j+1, y:i+1}));
            let pieceImg = piece ? piece.image : undefined ;
            board.push(<Tile num={key} flag={flag} image={pieceImg} key={key}/>);
        }
    }

    const grabElement = (e)=>{
        const element = e.target;
        const currentBoard = forReference.current;
        if(element.classList.contains('chessPiece') && currentBoard){
            const gX = Math.floor((e.clientX - currentBoard.offsetLeft)/GRID_SIZE) + 1;
            const gY = Math.abs(Math.ceil((e.clientY - currentBoard.offsetTop - 8*GRID_SIZE)/GRID_SIZE) - 1);
            setGrabPosition({x:gX, y: gY})
            //redundant
            const x = e.clientX - (GRID_SIZE/2);
            const y = e.clientY -(GRID_SIZE/2);
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setActivePiece(element);
        }
    }
    
    const moveElement = (e)=>{
        if(activePiece && forReference){
            const minX = forReference.current.offsetLeft - 10;
            const minY = forReference.current.offsetTop - 10;
            const maxX = forReference.current.clientWidth + minX - 60;
            const maxY = forReference.current.clientHeight + minY - 60;
            const x = e.clientX - (GRID_SIZE/2);
            const y = e.clientY -(GRID_SIZE/2);
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
            // if(x<minX || x>maxX || y<minY-(GRID_SIZE/2) || y>maxY+(GRID_SIZE/2)){
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
            const x = Math.floor((e.clientX - currentBoard.offsetLeft)/GRID_SIZE) + 1;
            const y = Math.abs(Math.ceil((e.clientY - currentBoard.offsetTop - 8*GRID_SIZE)/GRID_SIZE) - 1);
            
            const currentPiece = pieces.find((p) => isSamePosition(p.position, grabPosition));
            
            if(currentPiece){
                const validCheck = referee.evalIsValidMove(grabPosition, {x, y}, currentPiece.type, currentPiece.team, pieces);
                const isEnpassant = referee.isEnpassantMove(grabPosition, {x, y}, currentPiece.type, currentPiece.team, pieces);
                const pawnDirection = currentPiece.team===pieceTeam.OUR ? 1 : -1;
                
                if(isEnpassant){
                    const newPieces = pieces.reduce((result, piece)=>{
                        if(isSamePosition(piece.position, grabPosition)){
                            piece.position.x = x;
                            piece.position.y = y;
                            result.push(piece);
                        } else if(!(isSamePosition(piece.position, {x,y:y-pawnDirection}))){
                            if(piece.type === pieceType.pawn){
                                piece.enPassant = false;
                            }
                            result.push(piece);
                        }
                        return result;
                    }, []);
                    setPieces(newPieces);
                } else if(validCheck){
                    //updates the piece position and while attacking removes the opponent
                    const newPieces = pieces.reduce((result, piece)=>{
                        if(isSamePosition(piece.position, grabPosition)){
                            piece.enPassant = (Math.abs(y-grabPosition.y)===2 && piece.type===pieceType.PAWN);
                            piece.position.x = x;
                            piece.position.y = y;
                            result.push(piece);
                        } else if(!(isSamePosition(piece.position,{x,y}))){
                            if(piece.type===pieceType.PAWN){
                                piece.enPassant = false;
                            }
                            result.push(piece);
                        }
                        return result;
                    }, [])
                    setPieces(newPieces);
                } else{
                    //resets the piece position
                    activePiece.style.position = 'relative';
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left');
                }
            }
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