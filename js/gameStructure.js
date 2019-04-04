// Object containing the logic of the game
const gameStructure = {

  lastTurn: '', // storing the values for turns
  win: false, // to check if there is a winner
  winner: '', // saving winner name

  // storing possibilities of a win
  checkWin: {
    win1: ['col1', 'col2', 'col3'],
    win2: ['col4', 'col5', 'col6'],
    win3: ['col7', 'col8', 'col9'],
    win4: ['col1', 'col4', 'col7'],
    win5: ['col2', 'col5', 'col8'],
    win6: ['col3', 'col6', 'col9'],
    win7: ['col1', 'col5', 'col9'],
    win8: ['col3', 'col5', 'col7'],
  },

  userX: [], // storing moves made by player 1
  userO: [], // storing moves made by player 2

  // storing data on the board
  structure: {
    row1: {
      col1: '',
      col2: '',
      col3: ''
    },
    row2: {
      col4: '',
      col5: '',
      col6: ''
    },
    row3: {
      col7: '',
      col8: '',
      col9: ''
    }
  },

  // function to reset the game
  resetGame: function () {

    this.lastTurn = '';
    this.win = false;
    this.winner = '';

    this.userX = [];
    this.userO = [];

    for ( row in this.structure ) {

      for ( col in this.structure[row] ) {
        this.structure[row][col] = '';
      }

    }

  },

  // check if there is a winner
  checkProgress: function ( user ) {

    if( !this.win ) { // if no winner already

      let totalTurns = this.userX.length + this.userO.length; // total moves made

      if ( this[user].length >= 3 ) { // is the current player has moved at least 3 times

        for ( key in this.checkWin ) { // looping through the winning possibilities

          if( this.checkWin[ key ].every(val => this[user].includes(val))) { // if one winning condition true

            this.win = true; // winner found
            this.winner = user.slice(-1).toLowerCase(); // winner name stored

          }
        }
      }

      if( totalTurns >= 9 && !this.win ) { // if all 9 boxes marked but no winner yet

        this.win = true;
        this.winner = 'draw'; // it is a draw

      }

    }

  },

  // store data on each move
  markTurns: function ( place ) {

    const colNumber = place.split('-').join(''); // col number of the box clicked

    for ( row in this.structure ) { // loop through each row on the board

      let currentRow = this.structure[row];

      for ( col in currentRow ) { // loop through each row

        if ( col === colNumber && currentRow[ colNumber ] === '' ) { // if this is the box marked and is empty

          // changing player from the last turn
          if( this.lastTurn ) {

            this.lastTurn = ( this.lastTurn === 'x' ) ? 'o' : 'x';

          } else {

            this.lastTurn = 'x';

          }

          currentRow[ colNumber ] = this.lastTurn; // marking the turn on the board
          let userArray = `user${ this.lastTurn.toUpperCase() }`; // finding player respective arrays
          this[userArray].push( colNumber ); // passing the marked values to respective arrays

          this.checkProgress( userArray ); // checking if there is a winner or draw
          
        }

      }

    }
  }
};
