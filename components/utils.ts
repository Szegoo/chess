import {Piece} from '../pages/index';
export function isSameColor(isBlack: boolean, piece:Piece): boolean {
    let isWhite:boolean = false;
    if(Number(piece) >  6) {
        isWhite = true;
    }

    if(isBlack) {
        return isWhite;
    }
    return !isWhite;
}