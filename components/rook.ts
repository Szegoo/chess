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
    for(let i = currentRow+1; i < 8; i++) {
        if(!canMove(isBlack,board[i][currentCol])) {
            break;
        }
        moves.push(`${currentCol}-${currentRow}-${currentCol}-${i}`);
    }
    for(let i = currentRow-1; i >= 0; i--) {
        if(!canMove(isBlack,board[i][currentCol])) {
            break;
        }
        moves.push(`${currentCol}-${currentRow}-${currentCol}-${i}`);
    }
    for(let i = currentCol+1; i < 8; i++) {
        if(!canMove(isBlack,board[currentRow][i])) {
            break;
        }
        moves.push(`${currentCol}-${currentRow}-${i}-${currentRow}`);
    }
    for(let i = currentCol-1; i >= 0; i--) {
        if(!canMove(isBlack,board[currentRow][i])) {
            break;
        }
        moves.push(`${currentCol}-${currentRow}-${i}-${currentRow}`);
    }

    return moves;
}

function canMove(isBlack:boolean, piece: Piece):boolean {
    if(isSameColor(isBlack, piece) || piece === Piece.None) {
        return true;
    }
    return false;
}