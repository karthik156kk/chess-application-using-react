//Knight movement:
import { isTileEmptyOrEnemyOccupied} from "./GeneralRules";
export const knightMove = (initialPosition, desiredPosition, type, team, currBoardState) => {
    for(let i=-1; i<2; i+=2){
        for(let j=-1; j<2; j+=2){
            if(desiredPosition.x - initialPosition.x === 2*i && desiredPosition.y - initialPosition.y === j){
                if(isTileEmptyOrEnemyOccupied(desiredPosition, currBoardState, team)){
                    return true;
                }
            } else if(desiredPosition.x - initialPosition.x === i && desiredPosition.y - initialPosition.y === 2*j){
                if(isTileEmptyOrEnemyOccupied(desiredPosition, currBoardState, team)){
                    return true;
                }
            }
        }
    }
    return false;
}