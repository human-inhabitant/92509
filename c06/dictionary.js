$( document ).ready( () => {
  const $dictionary = $( '#dictionary' );

  $( '#loading' )
    .ajaxStart( function() {
      $( this ).show();
    })
    .ajaxStop( function() {
      $( this ).hide();
    })
  ;

  //bindBehaviors( this );

  $( '#letter-a .button' ).click( function() {
    $dictionary.hide().load( '../assets/data/a.html', function() {
      //bindBehaviors( this );
      $( this ).fadeIn();
    });
  });

  $( '#letter-b .button' ).click( function() {
    $.getJSON( '../assets/data/b.json', function( data ) {
      $dictionary.empty();
      $.each( data, function( entryIndex, entry ) {
        let html = '';
        html += '<div class="entry">';
          html += `<h3 class="term">${entry['term']}</h3>`;
          html += `<div class="part">${entry['part']}</div>`;
          html += `<div class="definition">${entry['definition']}`;
            if ( entry['quote'] ) {
              html += '<div class="quote">';
              $.each( entry['quote'], function( lineIndex, line ) {
                html += `<div class="quote-line">${line}</div>`;
              })
              if ( entry['author'] ) {
                html += `<div class="quote-author">${entry['author']}</div>`;
              }
              html += '</div>';
            }
          html += '</div>';
        html += '</div>';
        $dictionary.append( html );
      });
    });
  });

  $( '#letter-c .button' ).click( function() {
    $dictionary.empty();
    // This fails after first call...
    $.getScript( '../assets/data/c.js' );
  });

  $( '#letter-d .button' ).click( function() {
    $.get( '../assets/data/d.xml', function( data ) {
      console.info( data );
      $dictionary.empty();
      $( data ).find( 'entry' ).each( function() {
        const $entry = $( this );
        let html = '';
        html += '<div class="entry">';
          html += `<h3 class="term">${$entry.attr( 'term' )}</h3>`;
          html += `<div class="part">${$entry.attr( 'part' )}</div>`;
          html += `<div class="definition">${$entry.find( 'definition' ).text()}`;
          const $quote = $entry.find( 'quote' );
          if ( $quote.length ) {
            html += '<div class="quote">';
            $quote.find( 'line' ).each( function() {
              html += `<div class="quote-line">${$( this ).text()}</div>`;
            });
            if ( $quote.attr( 'author' ) ) {
              html += `<div class="quote-author">${$quote.attr( 'author' )}</div>`;
            }
            html += '</div>';
          }
        /*




        */
          html += '</div>';
        html += '</div>';
        $dictionary.append( html );
      });
    });
  });

  $( '#letter-e a' ).click( function() {
    $dictionary.empty();
    const term = $( this).text();
    $.post( '../assets/data/e.php', { 'term': term }, function( data ) {
      $dictionary.html( data );
    });
    return false;
  });

  $( '#letter-f form' ).submit( function() {
    $dictionary.empty();
    const term = $( 'input[name=term]' ).val();
    $.post( '../assets/data/f.php', { 'term': term }, function( data ) {
      $dictionary.html( data );
    });
    return false;
  });

  /*function bindBehaviors( scope ) {
    $( 'h3', scope ).click( function() {
      $( this ).toggleClass( 'highlighted' );
    });
  }*/
});