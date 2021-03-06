// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      let rowAlreadyHasPiece = false
      
      for (let column = 0; column < this.attributes.n; column++) {
        if (this.attributes[rowIndex][column] === 1) { 
          if (rowAlreadyHasPiece === false) { rowAlreadyHasPiece = true } 
          else { return true }
        }
      }
      return false
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {      
      for (let boardRow = 0; boardRow < this.attributes.n; boardRow++) {
        if ( this.hasRowConflictAt(boardRow) ) { return true }
      }
      return false
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let colAlreadyHasPiece = false

      for (let row = 0; row < this.attributes.n; row++) {
        if ( this.attributes[row][colIndex] === 1 ) {
          if ( colAlreadyHasPiece ) {
            return true
          } else {
            colAlreadyHasPiece = true
          }
        }        
      }

      return false
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {      
      for (let col = 0; col < this.attributes.n; col++) {
        if ( this.hasColConflictAt(col) ) { return true }
      }
      return false
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let colIndex = majorDiagonalColumnIndexAtFirstRow
      let rowIndex = 0
      let diagonalAlreadyHasPiece = false

      while (true) {
        if ( this._isInBounds(rowIndex, colIndex) && this.attributes[rowIndex][colIndex] === 1) {
          if ( diagonalAlreadyHasPiece ) {
            return true
          } else {
            diagonalAlreadyHasPiece = true            
          }
        } else if ( rowIndex === this.attributes.n) {
          break
        }
        rowIndex++
        colIndex++
      }

      return false
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let lastRow = this.attributes.n - 1
      let firstCol = 0

      const startIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(lastRow, firstCol)
      for (let index = startIndex; index < this.attributes.n; index++) {
        if ( this.hasMajorDiagonalConflictAt(index) ) {
          return true
        }
      }

      return false
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let col = minorDiagonalColumnIndexAtFirstRow
      let row = 0
      let diagonalAlreadyHasPiece = false

      while (true) {
        if (this._isInBounds(row, col) && this.attributes[row][col] === 1) {
          if ( diagonalAlreadyHasPiece ) {
            return true
          } else {
            diagonalAlreadyHasPiece = true
          }
        } else if ( row === this.attributes.n ) {
          break
        }
        row++
        col--
      }
      return false
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let last = this.attributes.n - 1
      const startIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(last, last)

      for (let index = startIndex; index > -1; index--) {
        if ( this.hasMinorDiagonalConflictAt(index) ) {
          return true
        }
      }

      return false
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
