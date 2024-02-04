import {pieceType, pieceTeam} from '../components/constants';
//Movement methods for diffent Piece types:
import { pawnMove } from  './rules/PawnRules';
import { knightMove } from './rules/KnightRules';
import { bishopMove } from './rules/BishopRules';
import { rookMove } from './rules/RookRules';
import { queenMove } from './rules/QueenRules';
import { kingMove } from './rules/KingRules';

export default class Referee {
    //for pawn's special 2 moves up being the last movement, moving diagonally will also attack the opponent
    isEnpassantMove(initialPosition, desiredPosition , playerType, playerTeam, boardState){
        const pawnDirection = playerTeam===pieceTeam.OUR ? 1 : -1;
        if(playerType === pieceType.PAWN){
            if((desiredPosition.x-initialPosition.x===-1 || desiredPosition.x-initialPosition.x===1) 
                && (desiredPosition.y-initialPosition.y)===pawnDirection){
                const underOverOpponent = boardState.find((p)=>{
                    return p.position.x===desiredPosition.x && p.position.y===(desiredPosition.y-pawnDirection) && p.enPassant===true
                });
                if(underOverOpponent){
                    return true;
                }
            }
        }
        return false;
    }
    //actual requried test for movement and attacking - returned result alters the chessboard directly
    evalIsValidMove(initialPosition, desiredPosition, type, team, currBoardState){
        let validCheck = false;
        switch(type){
            case pieceType.PAWN:
                validCheck = pawnMove(initialPosition, desiredPosition, type, team, currBoardState);
                break;
            case pieceType.KNIGHT:
                validCheck = knightMove(initialPosition, desiredPosition, type, team, currBoardState);
                break;
            case pieceType.BISHOP:
                validCheck = bishopMove(initialPosition, desiredPosition, type, team, currBoardState);
                break;
            case pieceType.ROOK:
                validCheck = rookMove(initialPosition, desiredPosition, type, team, currBoardState);
                break;
            case pieceType.QUEEN:
                validCheck = queenMove(initialPosition, desiredPosition, type, team, currBoardState);
                break;
            case pieceType.KING:
                validCheck = kingMove(initialPosition, desiredPosition, type, team, currBoardState);
                break;
            default:
                break;
        }
        return validCheck;
    }
}