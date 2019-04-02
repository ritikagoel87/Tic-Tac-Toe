const gameStructure = {
  lastTurn: '',
  win: false,
  winner: '',
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
  users: ['x', 'o'],
  userX: [],
  userO: [],

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

  checkProgress: function ( user ) {
    if( !this.win ) {
      if ( this[user].length >= 3 ) {
        for ( key in this.checkWin ) {
          if( this.checkWin[ key ].every(val => this[user].includes(val))) {
            this.win = true;
            this.winner = user.slice(-1).toLowerCase();
          }
        }
      }
      if( this.win ) {
        return this.winner;
      }
    }
  },

  markTurns: function ( place ) {
    const colNumber = place.split('-').join('');
    for ( row in this.structure ) {
      let currentRow = this.structure[row];
      for ( col in currentRow ) {
        if ( col === colNumber && currentRow[ colNumber ] === '' ) {
          if( this.lastTurn ) {
            this.lastTurn = ( this.lastTurn === 'x' ) ? 'o' : 'x';
          } else {
            this.lastTurn = 'x';
          }
          currentRow[ colNumber ] = this.lastTurn;
          let userArray = `user${ this.lastTurn.toUpperCase() }`;
          this[userArray].push( colNumber );
          $(`#${ place }`).text(`${ this.lastTurn }`);
          this.checkProgress( userArray );
        }
      }
    }
  }
};
