import {pieceType, pieceTeam} from '../components/constants';
export default class Referee{
    isTileOccupied(x,y,boardState){
        const findOccupiedPiece = boardState.find((p) => p.position.x===x && p.position.y===y);
        if(findOccupiedPiece){
            return true;
        }
        return false;
    }

    isTileOccupiedByOpponent(x,y, boardState, playerTeam){
        const opponent = boardState.find((p) => p.position.x===x && p.position.y===y && p.team !== playerTeam);
        if(opponent){
            return true;
        } else{
            return false;
        }
    }

    isEnpassantMove(initialPosition, desiredPosition , playerType, playerTeam, boardState){
        const pawnDirection = playerTeam===pieceTeam.OUR ? 1 : -1;
        if(playerType === pieceType.PAWN){
            if((desiredPosition.x-initialPosition.x===-1 || desiredPosition.x-initialPosition.x===1) && (desiredPosition.y-initialPosition.y)===pawnDirection){
                const underOverOpponent = boardState.find((p)=>p.position.x===desiredPosition.x && p.position.y===(desiredPosition.y-pawnDirection) && p.enPassant===true);
                if(underOverOpponent){
                    return true;
                }
            }
        }
        return false;
    }

    evalIsValidMove(initialPosition, desiredPosition, type, team, currBoardState){
        if(type === pieceType.PAWN){
            const specialRow = (team===pieceTeam.OUR) ? 2 : 7;
            const pawnDirection = (team===pieceTeam.OUR) ? 1 : -1;
            //Movement logic
            if(initialPosition.y===specialRow && desiredPosition.x===initialPosition.x && desiredPosition.y-initialPosition.y===2*pawnDirection){
                if(!this.isTileOccupied(desiredPosition.x, desiredPosition.y, currBoardState) && !this.isTileOccupied(desiredPosition.x, desiredPosition.y-pawnDirection, currBoardState)){
                    return true;
                }
            } else if(desiredPosition.x===initialPosition.x && desiredPosition.y-initialPosition.y===pawnDirection){
                if(!this.isTileOccupied(desiredPosition.x, desiredPosition.y, currBoardState)){
                    return true;
                }
            }
            //Attack logic
            else if(desiredPosition.x-initialPosition.x===-1 && desiredPosition.y-initialPosition.y===pawnDirection){
                if(this.isTileOccupiedByOpponent(desiredPosition.x, desiredPosition.y, currBoardState, team)){
                    return true;
                }
            } else if(desiredPosition.x-initialPosition.x===1 && desiredPosition.y-initialPosition.y===pawnDirection){
                if(this.isTileOccupiedByOpponent(desiredPosition.x, desiredPosition.y, currBoardState, team)){
                    return true;
                }
            }
        } 
        return false;
    }
}