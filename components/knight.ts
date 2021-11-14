import {Piece} from '../pages/index';
import {isSameColor} from './utils';

export default function checkMove(move:string, isBlack: boolean, board: Piece[][]):boolean {
    let data = move.split("-");
	let startCol:number = Number(data[0].charCodeAt(0) - 97);
    let startRow:number = 8 - Number(data[1]);
    let destCol:number = Number(data[2].charCodeAt(0) - 97);
    let destRow:number = 8-Number(data[3]);	

    let moveWithNums = `${startCol}-${startRow}-${destCol}-${destRow}`;

    let moves = getPossibleMoves(startCol, startRow, isBlack, board);
    console.log(moves);
    console.log(moveWithNums);

    for(let i = 0; i < moves.length; i++) {
        if(moves[i] === moveWithNums) {
            return true;
        }
    }
}
export function getPossibleMoves(currentCol:number,currentRow:number, isBlack: boolean, board: Piece[][]) {
    let moves = [];
    if(currentRow + 2 <= 7 && currentCol -1 >= 0 && canMove(isBlack, board[currentRow+2][currentCol-1])) {
        moves.push(`${currentCol}-${currentRow}-${currentCol-1}-${currentRow+2}`);
    }
    if(currentRow + 2 <= 7 && currentCol +1 <= 7 && canMove(isBlack, board[currentRow+2][currentCol+1])) {
        moves.push(`${currentCol}-${currentRow}-${currentCol+1}-${currentRow+2}`);
    }
    if(currentRow -2 >= 0 && currentCol -1 >= 0 && canMove(isBlack, board[currentRow-2][currentCol-1])) {
        moves.push(`${currentCol}-${currentRow}-${currentCol-1}-${currentRow-2}`);
    }
    if(currentRow -2 >= 0 && currentCol +1 <= 7 && canMove(isBlack, board[currentRow-2][currentCol+1])) {
        moves.push(`${currentCol}-${currentRow}-${currentCol+1}-${currentRow-2}`);
    }
    if(currentRow +1 <= 7 && currentCol +2 <= 7 && canMove(isBlack, board[currentRow+1][currentCol+2])) {
        moves.push(`${currentCol}-${currentRow}-${currentCol+2}-${currentRow+1}`);
    }
    if(currentRow -1 >= 0 && currentCol +2 <= 7 && canMove(isBlack, board[currentRow-1][currentCol+2])) {
        moves.push(`${currentCol}-${currentRow}-${currentCol+2}-${currentRow-1}`);
    }
    if(currentRow +1 < 8 && currentCol -2 >= 0 && canMove(isBlack, board[currentRow+1][currentCol-2])) {
        moves.push(`${currentCol}-${currentRow}-${currentCol-2}-${currentRow+1}`);
    }
    if(currentRow -1 >= 0 && currentCol -2 >= 0 && canMove(isBlack, board[currentRow-1][currentCol-2])) {
        moves.push(`${currentCol}-${currentRow}-${currentCol-2}-${currentRow-1}`);
    }
    return moves;
}

function canMove(isBlack:boolean, piece: Piece):boolean {
    if(isSameColor(isBlack, piece) || piece === Piece.None) {
        return true;
    }
    return false;
}