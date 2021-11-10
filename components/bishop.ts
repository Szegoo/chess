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

function getPossibleMoves(currentCol:number,currentRow:number, isBlack: boolean, board: Piece[][]) {
    let moves = [];
    console.log(currentCol);

    for(let i = currentCol+1; i < 8; i++) {
        if(currentRow+(i-currentCol) < 8 && canMove(isBlack, board[currentRow+(i-currentCol)][i])) {
            moves.push(`${currentCol}-${currentRow}-${i}-${currentRow+(i-currentCol)}`);
        }
    }
    for(let i = currentCol-1; i >= 0; i--) {
        if(currentRow+(currentCol-i) < 8 && canMove(isBlack, board[currentRow+(currentCol-i)][i])) {
            moves.push(`${currentCol}-${currentRow}-${i}-${currentRow+(currentCol - i)}`);
        }
    }
    for(let i = currentCol+1; i < 8; i++) {
        if(currentRow-(i-currentCol) >= 0 && canMove(isBlack, board[currentRow-(i-currentCol)][i])) {
            moves.push(`${currentCol}-${currentRow}-${i}-${currentRow-(i-currentCol)}`);
        }
    }
    for(let i = currentCol-1; i >= 0; i--) {
        if(currentRow-(currentCol-i) >= 0 && canMove(isBlack, board[currentRow-(currentCol-i)][i])) {
            moves.push(`${currentCol}-${currentRow}-${i}-${currentRow-(currentCol - i)}`);
        }
    }

    return moves;
}

function canMove(isBlack:boolean, piece: Piece):boolean {
    if(isSameColor(isBlack, piece) || piece === Piece.None) {
        return true;
    }
    return false;
}