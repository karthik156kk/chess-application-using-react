import {pieceType, pieceTeam} from '../components/constants';
export default class Referee{

    isTileOccupied(tilePosition,boardState){
        const findOccupiedPiece = boardState.find((p) => p.position.x===tilePosition.x && p.position.y===tilePosition.y);
        if(findOccupiedPiece){
            return true;
        }
        return false;
    }

    isTileOccupiedByOpponent(tilePosition, boardState, playerTeam){
        const opponent = boardState.find((p) => p.position.x===tilePosition.x && p.position.y===tilePosition.y && p.team !== playerTeam);
        if(opponent){
            return true;
        } else{
            return false;
        }
    }
    isTileEmptyOrEnemyOccupied(desiredPosition, boardState, playerTeam){
        return !this.isTileOccupied(desiredPosition, boardState) || this.isTileOccupiedByOpponent(desiredPosition, boardState, playerTeam)
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
                if(!this.isTileOccupied(desiredPosition, currBoardState) && !this.isTileOccupied({x:desiredPosition.x, y:desiredPosition.y-pawnDirection}, currBoardState)){
                    return true;
                }
            } else if(desiredPosition.x===initialPosition.x && desiredPosition.y-initialPosition.y===pawnDirection){
                if(!this.isTileOccupied(desiredPosition, currBoardState)){
                    return true;
                }
            }
            //Attack logic
            else if(desiredPosition.x-initialPosition.x===-1 && desiredPosition.y-initialPosition.y===pawnDirection){
                if(this.isTileOccupiedByOpponent(desiredPosition, currBoardState, team)){
                    return true;
                }
            } else if(desiredPosition.x-initialPosition.x===1 && desiredPosition.y-initialPosition.y===pawnDirection){
                if(this.isTileOccupiedByOpponent(desiredPosition, currBoardState, team)){
                    return true;
                }
            }
        } else if(type === pieceType.KNIGHT){
            for(let i=-1; i<2; i+=2){
                for(let j=-1; j<2; j+=2){
                    if(desiredPosition.x - initialPosition.x === 2*i && desiredPosition.y - initialPosition.y === j){
                        if(this.isTileEmptyOrEnemyOccupied(desiredPosition, currBoardState, team)){
                            return true;
                        }
                    } else if(desiredPosition.x - initialPosition.x === i && desiredPosition.y - initialPosition.y === 2*j){
                        if(this.isTileEmptyOrEnemyOccupied(desiredPosition, currBoardState, team)){
                            return true;
                        }
                    }
                }
            }
        } else if(type === pieceType.BISHOP){
            for(let i=1; i<9; i++){
                //Top Right movement
                if(desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y){
                    let passedPosition = {x: initialPosition.x + i, y: initialPosition.y + i};
                    if(desiredPosition.x === passedPosition.x && desiredPosition.y === passedPosition.y){
                        if(this.isTileEmptyOrEnemyOccupied(passedPosition, currBoardState, team)){
                            return true;
                        }
                    } else{
                        if(this.isTileOccupied(passedPosition, currBoardState)){
                            break;
                        }
                    }
                }
                //Top Left movement
                if(desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y){
                    let passedPosition = {x: initialPosition.x - i, y: initialPosition.y + i};
                    if(desiredPosition.x === passedPosition.x && desiredPosition.y === passedPosition.y){
                        if(this.isTileEmptyOrEnemyOccupied(passedPosition, currBoardState, team)){
                            return true;
                        }
                    } else{
                        if(this.isTileOccupied(passedPosition, currBoardState)){
                            break;
                        }
                    }
                }
                //Bottom Right movement
                if(desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y){
                    let passedPosition = {x: initialPosition.x + i, y: initialPosition.y - i};
                    if(desiredPosition.x === passedPosition.x && desiredPosition.y === passedPosition.y){
                        if(this.isTileEmptyOrEnemyOccupied(passedPosition, currBoardState, team)){
                            return true;
                        }
                    } else{
                        if(this.isTileOccupied(passedPosition, currBoardState)){
                            break;
                        }
                    }
                }
                //Bottom Left movement
                if(desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y){
                    let passedPosition = {x: initialPosition.x - i, y: initialPosition.y - i};
                    if(desiredPosition.x === passedPosition.x && desiredPosition.y === passedPosition.y){
                        if(this.isTileEmptyOrEnemyOccupied(passedPosition, currBoardState, team)){
                            return true;
                        }
                    } else{
                        if(this.isTileOccupied(passedPosition, currBoardState)){
                            break;
                        }
                    }
                }
            }
        }
        return false;
    }
}