$( document ).ready( () => {
  const $switcher = $( '#switcher' );
  const $switcherButton = $( '#switcher .button' );

  $switcher.click( toggleStyleSwitcher );

  $( '#switcher-narrow, #switcher-large' ).click( function() {
    $switcher.unbind( 'click', toggleStyleSwitcher );
  });
  $( '#switcher-normal' ).click( function() {
    $switcher.click( toggleStyleSwitcher );
  });

  $switcherButton.hover(function() {
    $( this ).addClass( 'hover' );
  }, function() {
    $( this ).removeClass( 'hover' );
  });

  $switcherButton.click( function( event ) {
    const $body = $( 'body' );
    $body.removeClass();
    if ( this.id === 'switcher-narrow' ) {
      $body.addClass( 'narrow' );
    } else if ( this.id === 'switcher-large' ) {
      $body.addClass( 'large' );
    }
    $( '#switcher .button' ).removeClass( 'selected' );
    $( this ).addClass( 'selected' );
    event.stopPropagation();
  });

  $switcher.trigger( 'click' );

  function toggleStyleSwitcher() {
    $switcherButton.toggleClass( 'hidden' );
  }
});