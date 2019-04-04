let currentPlayer = '';

let players = {
  player1: 'X',
  player2: 'O'
}

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

const displayStats = function () {
  if( !localStorage.getItem('tTT1') || !localStorage.getItem('tTT2') ) {
    localStorage.setItem('tTT1', '0');
    localStorage.setItem('tTT2', '0');
  }
  $('#result-stats').html('Scores so far: ');
  $('#result-stats').append(`Player 1 = "${ localStorage.getItem('tTT1') }" and Player 2 = "${ localStorage.getItem('tTT2') }"`);
  $('#result-stats').append(' - <span id="reset-scores"> Reset Scores</span>');
};

$(document).ready( function () {

  displayStats();

  $('.cols').on( 'click', function() {

    const clickId = $(this).attr('id');
    if( !gameStructure.win && $(this).is(':empty') ) {
      if ( gameStructure.lastTurn === 'o' || gameStructure.lastTurn === '' ){
        $(this).html(players.player1);
      } else {
        $(this).html(players.player2);
      }

      gameStructure.markTurns( clickId );
      if( gameStructure.win ) {

        if( gameStructure.winner === "draw" ){
          $('#result-output').html(`It's a <span id="winner">DRAW!</span>`);
        } else {
          $('#result-output').html(`<span id="winner">${ (gameStructure.winner === 'x') ? 'Player 1' : 'Player 2' }</span> is the winner!!`);
        }
        if ( gameStructure.winner === 'x' ) {
          localStorage['tTT1'] = Number(localStorage.getItem('tTT1')) + 1;
        } else if ( gameStructure.winner === 'o' ) {
          localStorage['tTT2'] = Number(localStorage.getItem('tTT2')) + 1;
        }
        displayStats();
      }
      else {
        $('#result-output').html(`<span id="winner">Keep Playing! Don't worry about the result just yet!</span>`);
      }
    }
  });

  $('#reset-button').on( 'click', function () {
    gameStructure.resetGame();
    $('#result-output').html('');
    $('.cols').html('');
  });

  $( "select" ).change(function() {
    if( gameStructure.lastTurn === '' ) {
      const currentId = $(this).attr('id');
      currentPlayer = currentId.split('-')[0];
      let otherId = "";
      let otherPlayer = "";
      if(currentId === 'player1-list') {
        otherId = 'player2-list';
      } else {
        otherId = 'player1-list';
      }
      if ( $(this).val() === $(`#${ otherId }`).val() ) {
        $(`#${ otherId }`).val(`${ otherId.split('-')[0] }`);
      }
      players[currentPlayer] = playerIcon( $(this).val() );
      players[otherPlayer] = playerIcon( $(`#${ otherId }`).val() );
    } else {
      alert('The game has already started, please wait until this one finishes!');
    }
  });

  // event delegation
  $("#result-stats").on('click', "#reset-scores", function(){
    if(confirm("Are you sure you want to reset the scores?")){
        localStorage.clear();
        location.reload();
    }
  });
});
