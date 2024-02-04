import {pieceTeam} from '../../components/constants';
import {isTileOccupied, isTileOccupiedByOpponent} from './GeneralRules';

//Pawn movement:
export const pawnMove = (initialPosition, desiredPosition, type, team, currBoardState) => {
    const specialRow = (team===pieceTeam.OUR) ? 2 : 7;
    const pawnDirection = (team===pieceTeam.OUR) ? 1 : -1;
    //Movement logic
    if(initialPosition.y===specialRow && desiredPosition.x===initialPosition.x && desiredPosition.y-initialPosition.y===2*pawnDirection){
        if(!isTileOccupied(desiredPosition, currBoardState) 
            && !isTileOccupied({x:desiredPosition.x, y:desiredPosition.y-pawnDirection}, currBoardState)){
            return true;
        }
    } else if(desiredPosition.x===initialPosition.x && desiredPosition.y-initialPosition.y===pawnDirection){
        if(!isTileOccupied(desiredPosition, currBoardState)){
            return true;
        }
    }
    //Attack logic
    else if(desiredPosition.x-initialPosition.x===-1 && desiredPosition.y-initialPosition.y===pawnDirection){
        if(isTileOccupiedByOpponent(desiredPosition, currBoardState, team)){
            return true;
        }
    } else if(desiredPosition.x-initialPosition.x===1 && desiredPosition.y-initialPosition.y===pawnDirection){
        if(isTileOccupiedByOpponent(desiredPosition, currBoardState, team)){
            return true;
        }
    }
    return false;
}