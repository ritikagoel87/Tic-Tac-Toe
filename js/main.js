let currentPlayer = '';     // to set the player who is currently taking the turn

// list of players in the game and their respective tokens
let players = {
  player1: 'X',
  player2: 'O'
}

// Changing the token of the player when required
const playerIcon = function ( icon ) {
  if ( icon === 'x') {
    return 'X';
  } else if ( icon === 'o' ) {
    return 'O';
  } else if ( icon === 'player1' ) {
    return '1';
  } else if ( icon === 'player2' ) {
    return '2';
  } else {
    return `<img src ="images/${ icon }.png" alt="Player Icon">`;
  }
}

// Setting and Displaying the statistics in and from localStorage
const displayStats = function () {
  if( !localStorage.getItem('tTT1') || !localStorage.getItem('tTT2') ) {
    localStorage.setItem('tTT1', '0');
    localStorage.setItem('tTT2', '0');
  }
  $('#result-stats').html('Scores so far: ');
  $('#result-stats').append(`Player 1 = "${ localStorage.getItem('tTT1') }" and Player 2 = "${ localStorage.getItem('tTT2') }"`);
  $('#result-stats').append(' - <span id="reset-scores"> Reset Scores</span>');
};

// Stuff that happens when DOM is ready
$(document).ready( function () {

  // First display the status from previous games
  displayStats();

  // When one of the boxes have been clicked to mark the turn
  $('.cols').on( 'click', function() {

    const clickId = $(this).attr('id'); // getting the id of the box clicked

    // Making sure that the game is still in progress and the box clicked is empty
    if( !gameStructure.win && $(this).is(':empty') ) {

      // Placing the tokens in the respective boxes by determining the player
      if ( gameStructure.lastTurn === 'o' || gameStructure.lastTurn === '' ){
        $(this).html(players.player1);
      } else {
        $(this).html(players.player2);
      }

      gameStructure.markTurns( clickId ); // Calling for the function where the logic lies

      // When the player wins
      if( gameStructure.win ) {

        if( gameStructure.winner === "draw" ){ // If it is a draw
          $('#result-output').html(`It's a <span id="winner">DRAW!</span>`);
        } else { // If it is a win
          $('#result-output').html(`<span id="winner">${ (gameStructure.winner === 'x') ? 'Player 1' : 'Player 2' }</span> is the winner!!`);
        }

        if ( gameStructure.winner === 'x' ) { // If the winner is Player 1
          localStorage['tTT1'] = Number(localStorage.getItem('tTT1')) + 1;
        } else if ( gameStructure.winner === 'o' ) { // If the winner is Player 2
          localStorage['tTT2'] = Number(localStorage.getItem('tTT2')) + 1;
        }

        // Display updated statistics
        displayStats();
      }
      else { // If the game is still in progress
        $('#result-output').html(`<span id="winner">Keep Playing! Don't worry about the result just yet!</span>`);
      }
    }
  });

  // To re-play the game
  $('#reset-button').on( 'click', function () {

    gameStructure.resetGame(); // Call the function that empties the data from the last game

    $('#result-output').html(''); // Empty the output

    $('.cols').html(''); // Clear the marks from the board
  });

  // When the player changes the token
  $( "select" ).change(function() {

    // Making sure the game has not started
    if( gameStructure.lastTurn === '' ) {

      // finding the id / player of the clicked options list
      const currentId = $(this).attr('id');
      currentPlayer = currentId.split('-')[0];

      let otherId = "";
      let otherPlayer = "";

      // finding id of the other player
      if(currentId === 'player1-list') { // if the change if for player 1
        otherId = 'player2-list';
      } else { // if the change is for player 2
        otherId = 'player1-list';
      }

      // if this player chooses the same token as the other player
      if ( $(this).val() === $(`#${ otherId }`).val() ) {
        $(`#${ otherId }`).val(`${ otherId.split('-')[0] }`); // change the value of selected token for the other player
      }

      // storing tokens for both the players
      players[currentPlayer] = playerIcon( $(this).val() );
      players[otherPlayer] = playerIcon( $(`#${ otherId }`).val() );

    } else { // if the game has already started
      alert('The game has already started, please wait until this one finishes!');
    }
  });

  // players click to reset the scores
  // event delegation
  $("#result-stats").on('click', "#reset-scores", function(){

    // confirming the action
    if(confirm("Are you sure you want to reset the scores?")){

        localStorage.clear(); // clearing the localStorage
        location.reload(); // re-loading the page to display new stats

    }
  });
});
