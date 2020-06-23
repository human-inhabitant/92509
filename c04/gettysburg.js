$( document ).ready( () => {
  $( 'div.label' ).click( function() {
    const $button = $( 'div.button' );
    const $paragraphs = $( 'div.speech p' );
    const buttonWidth = $button.width();
    const paddingLeft = $button.css( 'paddingLeft' );
    const paddingRight = $button.css( 'paddingRight' );
    const borderLeftWidth = $button.css( 'borderLeftWidth' );
    const borderRightWidth = $button.css( 'borderRightWidth' );
    const totalButtonWidth = parseInt( buttonWidth, 10 )
      + parseInt( paddingLeft, 10 )
      + parseInt( paddingRight, 10 )
      + parseInt( borderLeftWidth, 10 )
      + parseInt( borderRightWidth, 10 )
    ;
    const paraWidth = $paragraphs.width();
    const rightSide = paraWidth - totalButtonWidth;

    $button
      .fadeTo( 'slow', 0.5, function() {
        $( this ).css( 'backgroundColor', '#fff' );
      })
      .animate({ left: rightSide, height: 38 }, 'slow' )
      .fadeTo( 'slow', 1, function() {
        $( this ).css( 'backgroundColor', '#f00' );
      })
    ;
  });

  $( 'div.button' ).click(function() {
    const $speech = $( 'div.speech' );
    const currentSize = $speech.css( 'fontSize' );
    const unit = currentSize.slice( -2 );
    let num = parseFloat( currentSize );
    if ( 'switcher-large' === this.id ) {
      num *= 1.4;
    } else if ( 'switcher-small' === this.id ) {
      num /= 1.4;
    }
    $speech.css( 'fontSize', num + unit );
  });

  $( 'p:eq(1)' ).hide();
  $( 'span.more' ).click( function() {
    $( 'p:eq(1)' ).fadeIn( 'slow' );
    $( this ).hide();
  });

  $( 'p:eq(3)' ).css( 'backgroundColor', '#fcf' ).hide();
  $( 'p:eq(2)' ).css( 'backgroundColor', '#cff' )
    .click( function() {
      const $thisPara = $( this );
      $thisPara.next().slideDown( 'slow', function() {
        $thisPara.slideUp( 'slow' );
      });
    })
  ;


});