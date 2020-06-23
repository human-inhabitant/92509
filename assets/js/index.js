(function() {
  const $quote = $( '.quote' );
  const charWidth = 7.25;
  $.each( $quote, function( i, o ) {
    const a = [];
    $.each( $( 'span:not(:last-child)', o ), function( i, o ) {
      const spanWidth = $( o ).text().length;
      a.push( spanWidth );
    });
    $( o ).width( max( a ) * charWidth );
  });

  function max( input ) {
    if ( toString.call( input ) !== '[object Array]' ) {
      return false;
    }
    return Math.max.apply( null, input );
  }
})();