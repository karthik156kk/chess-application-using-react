import {pieceType, pieceTeam} from '../components/Chessboard';
export default class Referee{
    isTileOccupied(x,y,boardState){
        const findOccupiedPiece = boardState.find((p) => p.x===x && p.y===y);
        if(findOccupiedPiece){
            return true;
        }
        return false;
    }
    isTileOccupiedByOpponent(x,y, boardState, playerTeam){
        const opponent = boardState.find((p) => p.x===x && p.y===y && p.team !== playerTeam);
        if(opponent){
            return true;
        } else{
            return false;
        }
        
    }
    evalIsValidMove(prevX, prevY, currX, currY, type, team, currBoardState){
        if(type === pieceType.PAWN){
            const specialRow = (team===pieceTeam.OUR) ? 2 : 7;
            const pawnDirection = (team===pieceTeam.OUR) ? 1 : -1;
            //Movement logic
            if(prevY===specialRow && currX===prevX && currY-prevY===2*pawnDirection){
                if(!this.isTileOccupied(currX, currY, currBoardState) && !this.isTileOccupied(currX, currY-pawnDirection, currBoardState)){
                    return true;
                }
            } else if(currX===prevX && currY-prevY===pawnDirection){
                if(!this.isTileOccupied(currX, currY, currBoardState)){
                    return true;
                }
            }
            //Attack logic
            else if(currX-prevX===-1 && currY-prevY===pawnDirection){
                // console.log('upper left or bottom left movement');
                if(this.isTileOccupiedByOpponent(currX, currY, currBoardState, team)){
                    // console.log('we can strike the enemy');
                    return true;
                }
            } else if(currX-prevX===1 && currY-prevY===pawnDirection){
                // console.log('upper right or bottom right movement');
                if(this.isTileOccupiedByOpponent(currX, currY, currBoardState, team)){
                    // console.log('we can strike the enemy');
                    return true;
                }
            }
        }
        return false;
    }
}