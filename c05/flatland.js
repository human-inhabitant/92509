$( document ).ready( () => {
  $( '<a href="#top">back to top</a>' ).insertAfter( 'div.chapter p:gt(3)' );
  $( '<a id="top"></a>' ).prependTo( 'body' );

  $( 'div.chapter a[href*=wikipedia]' ).each( function( index ) {
    const $thisLink = $( this );
    $thisLink.attr({
      rel: 'external',
      id: `wikilink-${index}`,
      title: `Learn more about ${$thisLink.text()} at Wikipedia`
    });
  });

  $( '<ol id="notes"></ol>' ).insertAfter( 'div.chapter' );
  $( 'span.footnote' ).each( function( index ) {
    $( this )
      .before( `<a href="#foot-note-${index + 1}" id="context-${index + 1}" class="context"><sup>${index + 1}</sup></a>` )
      .appendTo( '#notes' )
      .append( `&nbsp;(<a href="#context-${index + 1}">context</a>)` )
      .wrap( `<li id="foot-note-${index + 1}"></li>` )
    ;
  });

  $( 'span.pull-quote' ).each( function( index ) {
    const $parentParagraph = $( this ).parent( 'p' );
    $parentParagraph.css( 'position', 'relative' );

    const $clonedCopy = $( this ).clone();
    $clonedCopy
      .addClass( 'pulled' )
      .find( 'span.drop' )
      .html( '&hellip;' )
      .end()
      .prependTo( $parentParagraph )
      .wrap( '<div class="pulled-wrapper"></div>' )
    ;
    const clonedText = $clonedCopy.text();
    $clonedCopy.html( clonedText );
  });
});