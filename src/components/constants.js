export const pieceType = Object.freeze({
    PAWN: 1,
    BISHOP: 2,
    KNIGHT: 3,
    ROOK: 4,
    KING:5,
    QUEEN: 6
})

export const pieceTeam = Object.freeze({
    OPPONENT: 0,
    OUR: 1
})

export const HORIZONTAL_AXIS = ['a','b','c','d','e','f','g','h'];
export const VERTICAL_AXIS = ['1', '2','3','4','5','6','7','8'];

export const GRID_SIZE = 75;

export const isSamePosition = (p1, p2) => {
    return p1.x===p2.x && p1.y===p2.y;
}