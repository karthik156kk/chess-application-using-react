import {pieceType, pieceTeam, isSamePosition} from '../components/constants';
export default class Referee {
    //to check whether the tile is occupied by either own piece or by opponent piece for invalid move
    isTileOccupied(tilePosition,boardState){
        const findOccupiedPiece = boardState.find((p) => p.position.x===tilePosition.x && p.position.y===tilePosition.y);
        if(findOccupiedPiece){
            return true;
        }
        return false;
    }
    //to check whether the tile is occupied by opponent piece for attacking
    isTileOccupiedByOpponent(tilePosition, boardState, playerTeam){
        const opponent = boardState.find((p) => p.position.x===tilePosition.x && p.position.y===tilePosition.y && p.team !== playerTeam);
        if(opponent){
            return true;
        } else{
            return false;
        }
    }
    //combines the needed result of having an empty tile or occupied by the opponent piece
    isTileEmptyOrEnemyOccupied(desiredPosition, boardState, playerTeam){
        return !this.isTileOccupied(desiredPosition, boardState) || this.isTileOccupiedByOpponent(desiredPosition, boardState, playerTeam)
    }
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
    //Movement methods for diffent Piece types:
    //Pawn movement:
    pawnMove(initialPosition, desiredPosition, type, team, currBoardState){
        const specialRow = (team===pieceTeam.OUR) ? 2 : 7;
        const pawnDirection = (team===pieceTeam.OUR) ? 1 : -1;
        //Movement logic
        if(initialPosition.y===specialRow && desiredPosition.x===initialPosition.x && desiredPosition.y-initialPosition.y===2*pawnDirection){
            if(!this.isTileOccupied(desiredPosition, currBoardState) 
                && !this.isTileOccupied({x:desiredPosition.x, y:desiredPosition.y-pawnDirection}, currBoardState)){
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
        return false;
    }
    //Knight movement:
    knightMove(initialPosition, desiredPosition, type, team, currBoardState){
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
        return false;
    }
    //Bishop movement:
    bishopMove(initialPosition, desiredPosition, type, team, currBoardState){
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
        return false;
    }
    //Rook movement:
    rookMove(initialPosition, desiredPosition, type, team, currBoardState){
        if(desiredPosition.x === initialPosition.x){
            const multiplier = (desiredPosition.y > initialPosition.y) ? 1 : -1;
            for(let i=1; i<9; i++){
                let passedPosition = {x: initialPosition.x, y: initialPosition.y + (i * multiplier)};
                if(passedPosition.x===desiredPosition.x && passedPosition.y===desiredPosition.y){
                    if(this.isTileEmptyOrEnemyOccupied(passedPosition, currBoardState, team)){
                        return true;
                    }
                } else{
                    if(this.isTileOccupied(passedPosition, currBoardState)){
                        break;
                    }
                }
            }
        } else if(desiredPosition.y === initialPosition.y){
            const multiplier = (desiredPosition.x > initialPosition.x) ? 1 : -1;
            for(let i=1; i<9; i++){
                let passedPosition = {x: initialPosition.x + i * multiplier, y: initialPosition.y};
                if(passedPosition.x===desiredPosition.x && passedPosition.y===desiredPosition.y){
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
        return false;
    }
    //Queen Movement:
    queenMove(initialPosition, desiredPosition, type, team, currBoardState){
        for(let i=1; i<9; i++){
            //Top and Bottom movement
            if(desiredPosition.x===initialPosition.x){
                const multiplier = desiredPosition.y > initialPosition.y ? 1 : -1;
                let passedPosition = {x: initialPosition.x, y: initialPosition.y+(i*multiplier)};
                if(isSamePosition(desiredPosition, passedPosition)){
                    if(this.isTileEmptyOrEnemyOccupied(passedPosition, currBoardState, team)){
                        return true;
                    }
                } else{
                    if(this.isTileOccupied(passedPosition, currBoardState)){
                        break;
                    }
                }
            } 
            //Right and left movement
            else if(desiredPosition.y===initialPosition.y){
                const multiplier = desiredPosition.x > initialPosition.x ? 1 : -1;
                let passedPosition = {x: initialPosition.x + (i*multiplier), y: initialPosition.y}
                if(isSamePosition(desiredPosition, passedPosition)){
                    if(this.isTileEmptyOrEnemyOccupied(passedPosition, currBoardState, team)){
                        return true;
                    }
                } else{
                    if(this.isTileOccupied(passedPosition, currBoardState)){
                        break;
                    }
                }
            } 
            //Diagonal movement
            const multiplierX = desiredPosition.x > initialPosition.x ? 1 : -1;
            const multiplierY = desiredPosition.y > initialPosition.y ? 1 : -1;
            let passedPosition = {x: initialPosition.x + (i*multiplierX), y: initialPosition.y + (i*multiplierY)};
            if(isSamePosition(desiredPosition, passedPosition)){
                if(this.isTileEmptyOrEnemyOccupied(passedPosition, currBoardState, team)){
                    return true;
                }
            } else{
                if(this.isTileOccupied(passedPosition, currBoardState)){
                    break;
                }
            }
        }
        return false;
    }
    //King Movement:
    kingMove(initialPosition, desiredPosition, type, team, currBoardState){
        console.log('All Hail The KING!!');
        return false;
    }
    //actual requried test for movement and attacking - returned result alters the chessboard directly
    evalIsValidMove(initialPosition, desiredPosition, type, team, currBoardState){
        let validCheck = false;
        switch(type){
            case pieceType.PAWN:
                validCheck = this.pawnMove(initialPosition, desiredPosition, type, team, currBoardState);
                break;
            case pieceType.KNIGHT:
                validCheck = this.knightMove(initialPosition, desiredPosition, type, team, currBoardState);
                break;
            case pieceType.BISHOP:
                validCheck = this.bishopMove(initialPosition, desiredPosition, type, team, currBoardState);
                break;
            case pieceType.ROOK:
                validCheck = this.rookMove(initialPosition, desiredPosition, type, team, currBoardState);
                break;
            case pieceType.QUEEN:
                validCheck = this.queenMove(initialPosition, desiredPosition, type, team, currBoardState);
                break;
            case pieceType.KING:
                validCheck = this.kingMove(initialPosition, desiredPosition, type, team, currBoardState);
                break;
            default:
                console.log('sorry');
        }
        return validCheck;
    }
}