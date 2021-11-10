import {Piece} from '../pages/index';
export function isSameColor(isBlack: boolean, piece:Piece): boolean {
    let isWhite:boolean = false;
    if(piece === Piece.King || piece === Piece.KingW) {
        //can't eat a king
        return false;
    }
    if(Number(piece) >  6) {
        isWhite = true;
    }

    if(isBlack) {
        return isWhite;
    }
    return !isWhite;
}