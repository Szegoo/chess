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

    
    return false;
}

export function getPossibleMoves(currentCol:number,currentRow:number, isBlack: boolean, board: Piece[][]) {
    let moves = [];
    console.log(board);
    if(isBlack) {
        if(board[3][currentCol] === Piece.None) {
            if(currentRow === 1) {
                moves.push(`${currentCol}-${currentRow}-${currentCol}-3`);
            }
        }
        if(board[currentRow+1][currentCol] === Piece.None) {
            moves.push(`${currentCol}-${currentRow}-${currentCol}-${currentRow+1}`);
        }
        if(board[currentRow+1][currentCol-1] !== Piece.None && isSameColor(true, board[currentRow+1][currentCol-1])) {
            moves.push(`${currentCol}-${currentRow}-${currentCol-1}-${currentRow+1}`);
        }
        if(board[currentRow+1][currentCol+1] !== Piece.None && isSameColor(true, board[currentRow+1][currentCol+1])) {
            moves.push(`${currentCol}-${currentRow}-${currentCol+1}-${currentRow+1}`);
        }
    }else {
        console.log('white');
        if(board[currentRow-2][currentCol] === Piece.None) {
            if(currentRow === 6) {
                moves.push(`${currentCol}-${currentRow}-${currentCol}-${currentRow-2}`);
            }
        }
        if(board[currentRow-1][currentCol] === Piece.None) {
            moves.push(`${currentCol}-${currentRow}-${currentCol}-${currentRow-1}`);
        }
        if(board[currentRow-1][currentCol-1] !== Piece.None && isSameColor(false, board[currentRow-1][currentCol-1])) {
            moves.push(`${currentCol}-${currentRow}-${currentCol-1}-${currentRow-1}`);
        }
        if(board[currentRow-1][currentCol+1] !== Piece.None && isSameColor(false, board[currentRow-1][currentCol+1])) {
            moves.push(`${currentCol}-${currentRow}-${currentCol+1}-${currentRow-1}`);
        }
    }
    return moves;
}