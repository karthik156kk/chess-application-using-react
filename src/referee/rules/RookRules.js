//Rook movement:
import { isSamePosition } from "../../components/constants";
import { isTileOccupied, isTileEmptyOrEnemyOccupied } from "./GeneralRules";
export const rookMove = (initialPosition, desiredPosition, type, team, currBoardState) => {
    if(desiredPosition.x === initialPosition.x){
        const multiplier = (desiredPosition.y > initialPosition.y) ? 1 : -1;
        for(let i=1; i<9; i++){
            let passedPosition = {x: initialPosition.x, y: initialPosition.y + (i * multiplier)};
            if(isSamePosition(desiredPosition, passedPosition)){
                if(isTileEmptyOrEnemyOccupied(passedPosition, currBoardState, team)){
                    return true;
                }
            } else{
                if(isTileOccupied(passedPosition, currBoardState)){
                    break;
                }
            }
        }
    } else if(desiredPosition.y === initialPosition.y){
        const multiplier = (desiredPosition.x > initialPosition.x) ? 1 : -1;
        for(let i=1; i<9; i++){
            let passedPosition = {x: initialPosition.x + i * multiplier, y: initialPosition.y};
            if(isSamePosition(desiredPosition, passedPosition)){
                if(isTileEmptyOrEnemyOccupied(passedPosition, currBoardState, team)){
                    return true;
                }
            } else{
                if(isTileOccupied(passedPosition, currBoardState)){
                    break;
                }
            }
        }
    }
    return false;
}