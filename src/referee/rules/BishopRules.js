import { isTileOccupied, isTileEmptyOrEnemyOccupied} from "./GeneralRules";
import { isSamePosition } from "../../components/constants";
//Bishop movement:
export const bishopMove = (initialPosition, desiredPosition, type, team, currBoardState) => {
    for(let i=1; i<9; i++){
        //Top Right movement
        if(desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y){
            let passedPosition = {x: initialPosition.x + i, y: initialPosition.y + i};
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
        //Top Left movement
        if(desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y){
            let passedPosition = {x: initialPosition.x - i, y: initialPosition.y + i};
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
        //Bottom Right movement
        if(desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y){
            let passedPosition = {x: initialPosition.x + i, y: initialPosition.y - i};
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
        //Bottom Left movement
        if(desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y){
            let passedPosition = {x: initialPosition.x - i, y: initialPosition.y - i};
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