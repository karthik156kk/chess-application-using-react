import {pieceType, pieceTeam} from '../components/Chessboard';
export default class Referee{
    isTileOccupied(x,y,boardState){
        const findOccupiedPiece = boardState.find((p) => p.x===x && p.y===y);
        if(findOccupiedPiece){
            return true;
        }
        return false;
    }
    evalIsValidMove(prevX, prevY, currX, currY, type, team, currBoardState){
        if(type === pieceType.PAWN){
            const specialRow = (team===pieceTeam.OUR) ? 2 : 7;
            const pawnDirection = (team===pieceTeam.OUR) ? 1 : -1;

            if(prevY===specialRow){
                if(prevX===currX && currY-prevY===pawnDirection){
                    if(!this.isTileOccupied(currX, currY, currBoardState)){
                        return true;
                    }
                } else if(prevX===currX && currY-prevY===pawnDirection*2){
                    if(!this.isTileOccupied(currX, currY, currBoardState) && !this.isTileOccupied(currX, currY-pawnDirection, currBoardState)){
                        return true;
                    }
                }
            } else{
                if(prevX===currX && currY-prevY===pawnDirection){
                    if(!this.isTileOccupied(currX, currY, currBoardState)){
                        return true;
                    }
                }
            }
        }
        return false;
    }
}