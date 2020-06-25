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
            $table.trigger( 'repaginate' );
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

    $table.bind( 'repaginate', function() {
      $table
        .find( 'tbody tr' )
        .show()
        .lt( currentPage * numPerPage )
        .hide()
        .end()
        .gt( ( currentPage + 1 ) * numPerPage - 1 )
        .hide().end()
      ;
    });

    const numRows = $table.find( 'tbody tr' ).length;
    const numPages = Math.ceil( numRows / numPerPage );
    const $pager = $( '<div class="pager"></div>' );
    for ( let page = 0; page < numPages; page++ ) {
      $( `<span class="page-number">${page + 1}</span>` )
        .bind( 'click', { 'newPage': page }, function( event ) {
          currentPage = event.data['newPage'];
          $table.trigger( 'repaginate' );
          $( this ).addClass( 'active' ).siblings().removeClass( 'active' );
        })
        .appendTo( $pager )
        .addClass( 'clickable' )
      ;
    }
    $pager.find( 'span.page-number:first' ).addClass( 'active' );
    $pager.insertBefore( $table );
    $table.trigger( 'repaginate' );
  });

  /*
  const classNames = { 0: 'first', 1: 'second', 2: 'third' };
  $( 'table.striped tbody tr:not([th])' ).each( function( index ) {
    $( this ).addClass( classNames[index % 3]);
  });

  let rowClass = 'even';
  let rowIndex = 0;
  $( 'table.striped tbody tr' ).each( function() {
    if ( $( 'th', this ).length ) {
      rowClass = 'subhead';
      rowIndex = -1;
    } else if ( rowIndex % 3 === 0 ) {
      rowClass = ( rowClass === 'even' ? 'odd' : 'even' );
    }
    $( this ).addClass( rowClass );
    rowIndex++;
  });
  */

  $( 'table.striped' ).each( function() {
    $( this ).bind( 'stripe', function() {
      let rowIndex = 0;
      $( 'tbody tr:not(.filtered)', this ).each( function( index ) {
        if ( $(  'th', this ).length ) {
          $( this ).addClass( 'subhead' );
          rowIndex = -1;
        } else {
          if ( rowIndex % 6 < 3 ) {
            $( this ).removeClass( 'odd' ).addClass( 'even' );
          } else {
            $( this ).removeClass( 'even' ).addClass( 'odd' );
          }
        }
        rowIndex++;
        console.info( 'rowIndex', rowIndex );
      });
    });
    $( this ).trigger( 'stripe' );
  });

  let column = 3;
  $( `table.striped td:nth-child(${column})` )
    .addClass( 'clickable' )
    .click( function() {
      const thisClicked = $( this ).text();
      $( `table.striped td:nth-child(${column})` ).each( function() {
        if ( thisClicked === $( this ).text() ) {
          $( this ).parent().toggleClass( 'highlight' );
        } else {
          $( this ).parent().removeClass( 'highlight' );
        }
      });
      showTooltip.call( this, event );
    })
    .hover( showTooltip, hideTooltip )
    .mousemove( positionTooltip )
  ;

  const toggleMinus = '../assets/img/icons/bullet_toggle_minus.png';
  const togglePlus = '../assets/img/icons/bullet_toggle_plus.png';
  const $subHead = $( 'tbody th:first-child' );
  $subHead.prepend( `<img src="${toggleMinus}" alt="Collapse this section" />` );
  $( 'img', $subHead )
    .addClass( 'clickable' )
    .click( function() {
      const toggleSrc = $( this ).attr( 'src' );
      if ( toggleSrc === toggleMinus ) {
        $( this )
          .attr( 'src', togglePlus )
          .parents( 'tr' )
          .siblings()
          .addClass( 'collapsed' )
          .fadeOut( 'fast' )
        ;
      } else {
        $( this )
          .attr( 'src', toggleMinus )
          .parents( 'tr' )
          .siblings()
          .removeClass( 'collapsed' )
          .not( '.filtered' )
          .fadeIn( 'fast' )
        ;
      }
    })
  ;

  $( 'table.filterable' ).each( function() {
    const $table = $( this );
    $table.find( 'th' ).each( function( column ) {
      if ( $( this ).is( '.filter-column' ) ) {
        const $filters = $( `<div class="filters"><h3>Filter by ${$( this ).text()}</h3></div>` );
        const keywords = {};
        $table.find( 'tbody tr td' ).filter( `:nth-child(${column + 1})` ).each( function() {
          keywords[$( this ).text()] = $( this ).text();
        });
        $( '<div class="filter">all</div>' )
          .click( function() {
            $table.find( 'tbody tr' ).show().removeClass( 'filtered' );
            $( this ).addClass( 'active' ).siblings().removeClass( 'active' );
            $table.trigger( 'stripe' );
          })
          .addClass( 'clickable active' )
          .appendTo( $filters )
        ;
        $.each( keywords, function( index, keyword ) {
          $( '<div class="filter"></div>' )
            .text( keyword )
            .bind( 'click', { 'keyword': keyword }, function( event ) {
              $table.find( 'tbody tr' ).each( function() {
                if ( $( 'td', this ).filter( `:nth-child(${column + 1})` ).text() === event.data['keyword'] ) {
                  $( this ).removeClass( 'filtered' ).not( '.collapsed' ).show();
                } else if ( $( 'th', this ).length === 0 ) {
                  $( this ).addClass( 'filtered' ).hide();
                }
              });
              $( this ).addClass( 'active' ).siblings().removeClass( 'active' );
              $table.trigger( 'stripe' );
            })
            .addClass( 'clickable' )
            .appendTo( $filters )
          ;
        });


        $filters.insertBefore( $table );
        console.info('column', column );
      }
    });
  });

  // **************************************************************************************************************** //

  function alternateRowColors() {
    $( 'tbody tr', this ).removeClass( 'odd even');
    $( 'tbody tr:odd', this ).addClass( 'odd' );
    $( 'tbody tr:even', this ).addClass( 'even' );
    return this;
  }
  function positionTooltip( event ) {
    const tPosX = event.pageX - 5;
    const tPosY = event.pageY + 20;
    $( 'div.tooltip' ).css({ top: tPosY, left: tPosX });
  }
  function showTooltip( event ) {
    $( 'div.tooltip' ).remove();
    const $thisAuthor = $( this ).text();
    let highlighted = '';
    if ( $( this ).parent().is( '.highlight' ) ) {
      highlighted = 'un-';
    } else {
      highlighted = '';
    }
    $( `<div class="tooltip">Click to ${highlighted}highlight all articles written by ${$thisAuthor}</div>` ).appendTo( 'body' );
    positionTooltip( event );
  }
  function hideTooltip() {
    $( 'div.tooltip' ).remove();
  }

})( jQuery );