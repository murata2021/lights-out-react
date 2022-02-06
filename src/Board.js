import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.2 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
      // True or False random generator
    // const randLogicGenerator=()=> ([true,false][Math.floor(Math.random()*2)]);
    const randLogicGenerator=()=>(Math.random()<chanceLightStartsOn)
      //creates 2D array with randomly generated true/false values
    initialBoard=Array.from({length:ncols}).map(()=>Array.from({length:nrows}).map(()=>randLogicGenerator()))

    return initialBoard;
  }

  

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let row=0;row<board.length;row++){
      for (let col=0;col<board[row].length;col++){
        if(board[row][col]){
          return false
        }
      }
    }
    return true
  }
  

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let boardCopy=board.map((el)=>[...el])
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x,boardCopy)
      flipCell(y+1,x,boardCopy)
      flipCell(y-1,x,boardCopy)
      flipCell(y,x+1,boardCopy)
      flipCell(y,x-1,boardCopy)

      console.log(boardCopy)
      return boardCopy;
      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO



  let htmlBoard=[];

  for (let y=0;y<nrows;y++){
    let row=[];
    for (let x=0;x<ncols;x++){
      let coord= `${y}-${x}`;
      row.push(
        <Cell 
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={()=> flipCellsAround(coord)} 
        />
      );
    }
    htmlBoard.push(<tr key={y}>{row}</tr>)
  }


  
  let winningMsg=<><img src='https://media.giphy.com/media/B8MhRFZsRVRmg/giphy.gif'/><p>Good Night!</p></>
  let res=hasWon()?winningMsg:(<table className="Board">
                                    <tbody>
                                      {htmlBoard}
                                    </tbody>
                              </table>)

  return (
    <>
     {res}
    </>
  );

}

export default Board;
