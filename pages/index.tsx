import React from 'react';
import checkPawnMove from '../components/pawn';
import checkKnightMove from '../components/knight';
import checkBishopMove from '../components/bishop';

export enum Piece {
    None,
    Pawn,
    Knight,
    Bishop,
    Rook,
    Queen,
    King,
    PawnW,
    KnightW,
    BishopW,
    RookW,
    QueenW,
    KingW,
}
interface State {
    board: Piece[][],
    input: string
}

export default class Chess extends React.Component<null,State> {
    state = {
        board: [],
        input: ''
    }
    componentDidMount() {
        let board: Piece[][] = [];

        board[0] = [ Piece.Rook, Piece.Knight, Piece.Bishop, Piece.Queen, Piece.King,
            Piece.Bishop, Piece.Knight, Piece.Rook];

        board[7] = [ Piece.RookW, Piece.KnightW, Piece.BishopW, Piece.QueenW, Piece.KingW,
            Piece.BishopW, Piece.KnightW, Piece.RookW];
        for(let i = 0; i < 8; i++) {
            if(i === 0 || i === 7) {
                continue;
            }
            board[i] = [];
            for(let k = 0; k < 8; k++) {
                if(i === 1) {
                    board[i][k] = Piece.Pawn; 
                }else if(i == 6) {
                    board[i][k] = Piece.PawnW;
                }
                else {
                    board[i][k] = Piece.None;
                }
            }
        }
        this.setState({board});
    }
    getImageSrc = (indx) => {
        let res = "";
        switch(indx) {
            case 1:
                res = "pawn_b.svg";
                break; 
            case 2:
                res = "knight_b.svg";
                break;
            case 3:
                res = "bishop_b.svg";
                break;
            case 4:
                res = "rook_b.svg";
                break;
            case 5:
                res = "queen_b.svg";
                break;
            case 6: 
                res = "king_b.svg";
                break;
            case 7:
                res = "pawn_w.svg";
                break; 
            case 8:
                res = "knight_w.svg";
                break;
            case 9:
                res = "bishop_w.svg";
                break;
            case 10:
                res = "rook_w.svg";
                break;
            case 11:
                res = "queen_w.svg";
                break;
            case 12: 
                res = "king_w.svg";
                break;
        }
        return res;
    }
    move = () => {
        let {input} = this.state;
        let {board} = this.state;

        let data = input.split('-');
        
        console.log(data);
        let startCol:number = Number(data[0].charCodeAt(0) - 97);
        let startRow:number = 8 - Number(data[1]);
        let destCol:number = Number(data[2].charCodeAt(0) - 97);
        let destRow:number = 8-Number(data[3]);

        let piece = board[startRow][startCol];

        const res = this.checkMove(input, piece);
        if(!res) return;

        board[startRow][startCol] = Piece.None;
        board[destRow][destCol] = piece;

        this.setState({board});
    }
    checkMove = (movement: string ,piece:Piece):boolean => {
        let {board} = this.state;
        let res = false;
        switch(piece) {
            case Piece.PawnW:
                res = checkPawnMove(movement, false, board);
                break;
            case Piece.Pawn:
                res = checkPawnMove(movement, true, board);
                break;
            case Piece.Knight:
                res = checkKnightMove(movement, true, board);
                break;
            case Piece.KnightW:
                res = checkKnightMove(movement, false, board);
                break;
            case Piece.Bishop:
                res = checkBishopMove(movement, true, board);
                break;
            case Piece.BishopW:
                res = checkBishopMove(movement, false, board);
                break;
        }
        return res;
    }
    render() {
        const {board} = this.state;
        console.log(board);
        return (
            <div>
                <div className="game">
                    <img className="board" src="chessboard.svg"/>
                    {board.length !== 0&& board.map((row, rIndx) =>
                        <div key={rIndx}>
                            {row.map((piece, indx) =>
                                <img key={indx} className="piece" 
                                style={{left: indx*60, top: rIndx*60}}
                                src={this.getImageSrc(piece)}/> 
                            )}
                        </div>
                    )}
                    <h3>8</h3><h3>7</h3><h3>6</h3><h3>5</h3><h3>4</h3><h3>3</h3>
                    <h3>2</h3><h3>1</h3>
                </div>
                <h3 className="chars">A B C D E F G H</h3>
                <input onChange={(e) => this.setState({input: e.target.value})} 
                placeholder="kolona-red-kolona-red"/>
                <button onClick={() => this.move()}>move</button>
            </div>
        )
    }
}