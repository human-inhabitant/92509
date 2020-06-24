'use strict';
(function( $ ) {
  jQuery.fn.alternateRowColors = alternateRowColors;

  $( 'table.sortable' ).each(function() {
    const $table = $( this );
    $table.alternateRowColors();
    $( 'th', $table ).each( function( column ) {
      let findSortKey;
      if ( $( this ).is( '.sort-alpha' ) ) {
        findSortKey = function( $cell ) {
          return `${$cell.find( '.sort-key' ).text().toLowerCase()} ${$cell.text().toLowerCase()}`;
        };
      } else if ( $( this ).is( '.sort-numeric' ) ) {
        findSortKey = function( $cell ) {
          const key = parseFloat( $cell.text().replace( /^[^\d.]*/, '' ) );
          return isNaN( key ) ? 0 : key;
        };
      } if ( $( this ).is( '.sort-date' ) ) {
        findSortKey = function( $cell ) {
          return Date.parse( `1 ${$cell.text()}` );
        };
      }
      if ( findSortKey ) {
        $( this )
          .addClass( 'clickable' )
          .hover( function() {
              $( this ).addClass( 'hover' );
            },
            function() {
              $( this ).removeClass( 'hover' );
            })
          .click( function() {
            const rows = $table.find( 'tbody > tr' ).get();
            let newDirection = 1;
            if ( $( this ).is( '.sorted-asc' ) ) {
              newDirection = -1;
            }
            $.each( rows, function( index, row ) {
              row.sortKey = findSortKey( $( row ).children( 'td' ).eq( column ) );
            });
            rows.sort( function( a, b ) {
              if ( a.sortKey < b.sortKey ) return -newDirection;
              if ( a.sortKey > b.sortKey ) return newDirection;
              return 0;
            });
            $.each( rows, function( index, row ) {
              $table.children( 'tbody' ).append( row );
              row.sortKey = null;
            });
            $table
              .find( 'th' )
              .removeClass( 'sorted-asc sorted-desc' )
            ;
            const $sortHead = $table.find( 'th' ).filter( `:nth-child(${column + 1})` );
            console.info( $sortHead, newDirection );
            if ( newDirection === 1 ) {
              $sortHead.addClass( 'sorted-asc' );
            } else {
              $sortHead.addClass( 'sorted-desc' );
            }
            $table
              .find( 'td' )
              .removeClass( 'sorted' )
              .filter( `:nth-child(${column + 1})` )
              .addClass( 'sorted' )
            ;
            $table.alternateRowColors();
          })
        ;
      }
    });
  });

  $( 'table.paginated' ).each( function() {
    const $table = $( this );
    let currentPage = 0;
    let numPerPage = 10;
    $table
      .find( 'tbody tr' )
      .show()
      .lt( currentPage * numPerPage )
      .end()
      .gt( ( currentPage + 1 ) * numPerPage - 1 )
      .hide().end()
    ;
  });

  // **************************************************************************************************************** //

  function alternateRowColors() {
    $( 'tbody tr', this ).removeClass();
    $( 'tbody tr:odd', this ).addClass( 'odd' );
    $( 'tbody tr:even', this ).addClass( 'even' );
    return this;
  }
})( jQuery );