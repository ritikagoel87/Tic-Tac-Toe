$(document).ready( function () {
  $('.cols').on( 'click', function() {
    const clickId = $(this).attr('id');
    let winner = gameStructure.markTurns( clickId );
    // console.log(gameStructure);
    if( gameStructure.win ) {
      $('#result-output').html(`<span id="winner">${ gameStructure.winner.toUpperCase() }</span> is the winner`);
    }
  });
});
