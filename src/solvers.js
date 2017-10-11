/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  const board = new Board({n})
  const matrix = board.rows()
  let numPieces = 0
  let solution = 0

  if (n === 0) { return [] }

  boardRecursion(0)

  function boardRecursion(rowIndex) {
    for (let col = 0; col < n; col++) {
      board.togglePiece(rowIndex, col)
      if ( board.hasAnyRooksConflicts() ) {
        board.togglePiece(rowIndex, col)
      } else {
        numPieces++
        if ( numPieces === n ) {
          solution = board.rows()
          break
        } else {
          let nextRow = rowIndex + 1
          boardRecursion(nextRow)
          if ( numPieces === n ) {
            solution = board.rows()
            break
          }
          numPieces--
          let toggleOffLastRook = board.rows()[rowIndex].indexOf(1)
          board.togglePiece(rowIndex, toggleOffLastRook)
        }
      }
      if (rowIndex === 0 && col === n-1 && numPieces !== n) { solution = {n} }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

}

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionCount = 0

  const board = new Board({n})
  const matrix = board.rows()
  let numPieces = 0
  let solution = 0

  if (n === 0) { return [] }

  boardRecursion(0)

  function boardRecursion(rowIndex) {
    for (let col = 0; col < n; col++) {
      board.togglePiece(rowIndex, col)
      if ( board.hasAnyRooksConflicts() ) {
        board.togglePiece(rowIndex, col)
      } else {
        numPieces++
        if ( numPieces === n ) {
          solutionCount++
          board.togglePiece(rowIndex, col)
          numPieces--
        } else {
          let nextRow = rowIndex + 1
          boardRecursion(nextRow)
          if ( numPieces === n ) {
            solutionCount++
            board.togglePiece(rowIndex, col)
            numPieces--
          }
          numPieces--
          let toggleOffLastRook = board.rows()[rowIndex].indexOf(1)
          board.togglePiece(rowIndex, toggleOffLastRook)
        }
      }
      if (rowIndex === 0 && col === n-1 && numPieces !== n) { solution = {n} }
    }
  }


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  const board = new Board({n})
  console.log(`solutionBoard.get('n'): ${board.get('n')}`)
  const matrix = board.rows()
  let numPieces = 0
  let solution = 0

  if (n === 0) { return [] }

  boardRecursion(0)

  //recurse for each row
  function boardRecursion(rowIndex) {
    //for each column in the row
    for (let col = 0; col < n; col++) {
      //toggle the queen on
      board.togglePiece(rowIndex, col)
      console.log(JSON.stringify(board.rows()))
      //if the board has conflicts
      if ( board.hasAnyQueensConflicts() ) {
        //toggle the queen off
        board.togglePiece(rowIndex, col)
      //else if the board has no queen conflicts
      } else {
        numPieces++
        //if there are 4 numPieces, push, and return 
        if ( numPieces === n ) {
          solution = board.rows()
          break
        //else
        } else {
          //move on to the next row and return recurse that
          let nextRow = rowIndex + 1
          boardRecursion(nextRow)
          if ( numPieces === n ) {
            solution = board.rows()
            break
          }
          numPieces--
          let toggleOffLastQueen = board.rows()[rowIndex].indexOf(1)
          board.togglePiece(rowIndex, toggleOffLastQueen)
        }
      }

      //if rowIndex, and on the last one, if it's down here, 
      //it means it's done
      if (rowIndex === 0 && col === n-1 && numPieces !== n) {
        solution = {n}
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
}

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solutionCount = 0

  // i found one solution. how do i now find multiple?
  // so now once it finds one solution, i want it just to log
  // then keep going thru the iterations to the end

  const board = new Board({n})
  const matrix = board.rows()
  let numPieces = 0
  let solution = 0

  if (n === 0) { return 1 }

  boardRecursion(0)

  function boardRecursion(rowIndex) {
    for (let col = 0; col < n; col++) {
      board.togglePiece(rowIndex, col)
      if ( board.hasAnyQueensConflicts() ) {
        board.togglePiece(rowIndex, col)
      } else {
        numPieces++
        if ( numPieces === n ) {
          solutionCount++
          board.togglePiece(rowIndex,col)
          numPieces--
        } else {
          let nextRow = rowIndex + 1
          boardRecursion(nextRow)
          if ( numPieces === n ) {
            solutionCount++
            board.togglePiece(rowIndex,col)
            numPieces--
          }
          numPieces--
          let toggleOffLastQueen = board.rows()[rowIndex].indexOf(1)
          board.togglePiece(rowIndex, toggleOffLastQueen)
        }
      }
      if (rowIndex === 0 && col === n-1 && numPieces !== n) {
        solution = {n}
      }
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
}


// const board = new Board({n})
// solution = board.rows()
// rowLength = solution.length
// colLength = solution[0].length

// for (let row = 0; row < rowLength; row++) {
//   for (let col = 0; col < colLength; col++) {
//     board.togglePiece(row, col)
//     if ( board.hasAnyRooksConflicts(row, col) ) {
//       board.togglePiece(row, col)
//     }
//   }
// }

// console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
// return solution;