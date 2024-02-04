//to check whether the tile is occupied by either own piece or by opponent piece for invalid move
export const isTileOccupied = (tilePosition,boardState) => {
    const findOccupiedPiece = boardState.find((p) => p.position.x===tilePosition.x && p.position.y===tilePosition.y);
    if(findOccupiedPiece){
        return true;
    }
    return false;
}
//to check whether the tile is occupied by opponent piece for attacking
export const isTileOccupiedByOpponent = (tilePosition, boardState, playerTeam) => {
    const opponent = boardState.find((p) => p.position.x===tilePosition.x && p.position.y===tilePosition.y && p.team !== playerTeam);
    if(opponent){
        return true;
    } else{
        return false;
    }
}
//combines the needed result of having an empty tile or occupied by the opponent piece
export const isTileEmptyOrEnemyOccupied = (desiredPosition, boardState, playerTeam) => {
    return !isTileOccupied(desiredPosition, boardState) || isTileOccupiedByOpponent(desiredPosition, boardState, playerTeam)
}