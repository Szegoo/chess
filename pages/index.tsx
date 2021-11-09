import React from 'react';

enum Piece {
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
    board: Piece[][]
}

export default class Chess extends React.Component<null,State> {
    state = {
        board: []
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
    render() {
        const {board} = this.state;
        console.log(board);
        return (
            <div>
                <img className="board" src="chessboard.svg"/>
                {board.length !== 0&& board.map((row, rIndx) =>
                    <div key={rIndx}>
                        {row.map((piece, indx) =>
                            <img className="piece" 
                            style={{left: indx*60, top: rIndx*60}}
                            src={this.getImageSrc(piece)}/> 
                        )}
                    </div>
                )}
                <input placeholder="move"/>
            </div>
        )
    }
}