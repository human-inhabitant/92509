$( document ).ready(() => {
  $( '#selected-plays > li' ).addClass( 'horizontal' );
  $( '#selected-plays li:not(.horizontal)' ).addClass( 'sub-level' );

  $( 'a[@href^="mailto:"]' ).addClass( 'mailto' );
  $( 'a[@href$=".pdf"]' ).addClass( 'pdflink' );
  $( 'a[@href*="mysite.com"]' ).addClass( 'mysite' );


  $( 'th' ).parent().addClass( 'table-heading' );
  $( 'tr:not([th]):even' ).addClass( 'even' );
  $( 'tr:not([th]):odd' ).addClass( 'odd' );
  $( 'td:contains("Henry")' )
    .parent()
    .find( 'td:eq(1)' )
    .addClass( 'highlight' )
    .end()
    .find( 'td:eq(2)' )
    .addClass( 'highlight' )
  ;
});