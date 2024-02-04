import { isSamePosition } from "../../components/constants";
import { isTileOccupied, isTileEmptyOrEnemyOccupied } from "./GeneralRules";
//Queen Movement:
export const queenMove = (initialPosition, desiredPosition, type, team, currBoardState) => {
    for(let i=1; i<9; i++){
        //Efficient All direction - horizontal, vertical and diagonal movement
        let multiplierX = (desiredPosition.x > initialPosition.x) ? 1 : (desiredPosition.x < initialPosition.x) ? -1 : 0;
        let multiplierY = (desiredPosition.y > initialPosition.y) ? 1 : (desiredPosition.y < initialPosition.y) ? -1 : 0;

        let passedPosition = {x: initialPosition.x + (i*multiplierX), y: initialPosition.y + (i*multiplierY)};
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
    return false;
}