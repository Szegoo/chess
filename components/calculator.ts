import {Piece} from '../pages/index';
import {getPossibleMoves as getPawnMoves} from '../components/pawn';
import {getPossibleMoves as getKnightMoves} from '../components/knight';
import {getPossibleMoves as getBishopMoves} from '../components/bishop';
import {getPossibleMoves as getRookMoves} from '../components/rook';
import {getPossibleMoves as getQueenMoves} from '../components/queen';
import {getPossibleMoves as getKingMoves} from '../components/king';

export default function calculate(board: Piece[][], isBlack:boolean) {
    let id = isBlack? 6: 12;
    let kingCol, kingRow;
    for(let i = 0; i < 8; i++) {
        for(let k = 0; k < 8; k++) {
            if(Number(board[i][k]) === id) {
                kingRow = i;
                kingCol = k;
            }
        }
    }
    return getAllMoves(board, isBlack, kingCol, kingRow);
}
export function getAllMoves(board: Piece[][], isBlack, kingCol, kingRow) {
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if(board[i][j] !== Piece.None) {
                const isSame = isSameColor(board[i][j], isBlack);
                if(isSame) {
                    return;
                }
                const getMoves = getCheckFn(board[i][j]);
                const moves = getMoves(j, i, isBlack, board);
                for(let i = 0; i < moves.length; i++) {
                    let data = moves[i].split("-");
                    let destCol = data[2];
                    let destRow = data[3];	
                    if(destCol === kingCol && destRow === kingRow) {
                        return true;
                    }
                }
            }
        }
    }

    return false
}

function getCheckFn(piece): any {
    let getPossibleMoves;
    console.log(piece);
    switch(piece) {
        case Piece.PawnW || Piece.Pawn:
            getPossibleMoves = getPawnMoves;
            break;
        case Piece.Knight || Piece.KnightW:
            getPossibleMoves = getKnightMoves;
            break;
        case Piece.Bishop || Piece.BishopW:
            getPossibleMoves = getBishopMoves;
            break;
        case Piece.Rook || Piece.RookW:
            getPossibleMoves = getRookMoves;
            break;
        case Piece.Queen || Piece.QueenW:
            getPossibleMoves = getQueenMoves;
            break;
        case Piece.King || Piece.KingW:
            getPossibleMoves = getKingMoves;
            break;
    }
    console.log(getPossibleMoves);
    return getPossibleMoves;
}
function isSameColor(piece:Piece, isBlack:boolean): boolean {
    let isWhite:boolean = false;
    if(Number(piece) >  6) {
        isWhite = true;
    }
    return isWhite === isBlack;
}