'use strict';
(function( $ ) {
jQuery.fn.log = function( message ) {
  return this.each( function() {
    let $context = $( this );
    while( $context.length ) {
      const $log = $context.find( '.log' );
      if ( $log.length ) {
        $( '<div class="log-message" />' ).text( message ).hide().appendTo( $log ).fadeIn();
        break;
      }
      $context = $context.parent();
    }
  });
}


  $( '.example .content' ).hide();

  $( '.example h3' ).click( function() {
    $( this ).parent().find( '.content' ).slideToggle();
  });

  $( '.category h2' ).click( function() {
    $( this ).parent().find( '.content' ).slideToggle();
  });

  $( '.log' ).append( $( '<div class="log-title">Results:</div>' ) );
})( jQuery );