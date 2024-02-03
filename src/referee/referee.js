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
            if(team === pieceTeam.OUR){
                if(prevY===2){
                    if(prevX===currX && currY-prevY===1){
                        if(!this.isTileOccupied(currX, currY, currBoardState)){
                            return true;
                        };
                    }else if(prevX===currX && currY-prevY===2){
                        if(!this.isTileOccupied(currX, currY, currBoardState) && !this.isTileOccupied(currX, currY-1, currBoardState)){
                            return true;
                        }
                    }
                } else{
                    if(prevX===currX && currY-prevY===1){
                        if(!this.isTileOccupied(currX, currY, currBoardState)){
                            return true;
                        }
                    }
                }
            } else{
                if(prevY===7){
                    if(prevX===currX && currY-prevY===-1){
                        if(!this.isTileOccupied(currX,currY, currBoardState)){
                            return true;
                        }
                    }
                    if(prevX===currX && currY-prevY===-2){
                        if(!this.isTileOccupied(currX, currY, currBoardState) && !this.isTileOccupied(currX, currY+1, currBoardState)){
                            return true;
                        }
                    }
                } else{
                    if(prevX===currX && (currY-prevY===-1)){
                        if(!this.isTileOccupied(currX, currY, currBoardState)){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}