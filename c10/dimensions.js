'use strict';
(function( $ ) {
  const $dimOuter = $( 'div.dim-outer' );
  const $dimInner = $( 'div.dim-inner' );

  $( '#example-dimensions-win-height-width .trigger' ).click( function() {
    const winHeight = $( window ).height();
    const winWidth = $( window ).width();
    $( this ).log( `window height: ${winHeight}, window width: ${winWidth}` );
  });

  $( '#example-dimensions-doc-height-width .trigger' ).click( function() {
    const docHeight = $( document ).height();
    const docWidth = $( document ).width();
    $( this ).log( `document height: ${docHeight}, document width: ${docWidth}` );
  });

  $( '#example-dimensions-height-width .trigger' ).click( function() {
    const boxHeight = $dimOuter.height();
    const boxWidth = $dimOuter.width();
    $( this ).log( 'height: ' + boxHeight + ', width: ' + boxWidth );
  });

  $( '#example-dimensions-inner-height-width .trigger' ).click( function() {

    const boxHeight = $dimOuter.innerHeight();
    const boxWidth = $dimOuter.innerWidth();
    $( this ).log( `innerHeight: ${boxHeight}, innerWidth: ${boxWidth}` );
  });

  $( '#example-dimensions-outer-height-width .trigger' ).click( function() {
    const boxHeight = $dimOuter.outerHeight();
    const boxWidth = $dimOuter.outerWidth();
    $( this ).log( `outerHeight: ${boxHeight}, outerWidth: ${boxWidth}` );
  });

  $( '#example-dimensions-scroll .trigger' ).click( function() {
    const sTop = $dimOuter.scrollTop();
    const sLeft = $dimOuter.scrollLeft();
    $( this ).log( `scrollTop: ${sTop}, scrollLeft: ${sLeft}` );
  });

  $( '#example-dimensions-doc-scroll .trigger' ).click( function() {
    const sTop = $( document ).scrollTop();
    const sLeft = $( document ).scrollLeft();
    $( this ).log( `scrollTop: ${sTop}, scrollLeft: ${sLeft}` );
  });

  $( '#example-dimensions-offset .trigger' ).click( function() {
    const outerOffsetTop = $dimOuter.offset().top;
    const outerOffsetLeft = $dimOuter.offset().left;
    const outerOffsetScrollTop = $dimOuter.offset().scrollTop;
    const outerOffsetScrollLeft = $dimOuter.offset().scrollLeft;
    $( this ).log( `top: ${outerOffsetTop}, left: ${outerOffsetLeft}, scrollTop: ${outerOffsetScrollTop}, scrollLeft: ${outerOffsetScrollLeft}` );
  });

  $( '#example-dimensions-offset-inner .trigger' ).click( function() {
    const innerOffsetTop = $dimInner.offset().top;
    const innerOffsetLeft = $dimInner.offset().left;
    const innerOffsetScrollTop = $dimInner.offset().scrollTop;
    const innerOffsetScrollLeft = $dimInner.offset().scrollLeft;
    $( this ).log( `top: ${innerOffsetTop}, left: ${innerOffsetLeft}, scrollTop: ${innerOffsetScrollTop}, scrollLeft: ${innerOffsetScrollLeft}` );
  });
})( jQuery );