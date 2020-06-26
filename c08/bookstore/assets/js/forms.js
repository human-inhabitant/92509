'use strict';
(function( $ ) {
  $( 'fieldset' ).each( function() {
    const heading = $( 'legend', this ).remove().text();
    $( '<h3></h3>' ).text( heading ).prependTo( this );
  });

  const requiredFlag = ' * ';
  let requiredKey = $( 'input.required:first' ).next( 'span' ).text();
  requiredKey = requiredFlag + requiredKey.replace( /^\((.+)\)$/, '$1' );

  const conditionalFlag = ' ** ';
  let conditionalKey = $( 'input.conditional:first' ).next( 'span' ).text();
  conditionalKey = conditionalFlag + conditionalKey.replace( /^\((.+)\)$/, '$1' );

  const $formInput = $( 'form :input' );
  $formInput.filter( '.required' ).next( 'span' ).text( requiredFlag ).end().prev( 'label' ).addClass( 'req-label' );
  $formInput.filter( '.conditional' ).next( 'span' ).text( conditionalFlag );

  $( '<p></p>' ).addClass( 'field-keys' ).append( `${requiredKey}<br/>` ).append( conditionalKey ).insertBefore( '#contact' );

  const $inputConditional = $( 'input.conditional' );
  $inputConditional.hide().next( 'span' ).hide();
  $inputConditional.each( function() {
    const $thisInput = $( this );
    const $thisFlag = $thisInput.next( 'span' ).hide();
    $thisInput.prev( 'label' ).find( ':checkbox' ).click( function() {
      if ( this.checked ) {
        $thisInput.show().addClass( 'required' );
        $thisFlag.show();
        $( this ).parent( 'label' ).addClass( 'req-label' );
      } else {
        $thisInput.hide().removeClass( 'required' ).blur();
        $thisFlag.hide();
        $( this ).parent( 'label' ).removeClass( 'req-label' );
      }
    });
  });

  $formInput.blur( function() {
    $( this ).parents( 'li:first' ).removeClass( 'warning' ).find( 'span.error-message' ).remove();
    if ( $( this ).is( '.required' ) ) {
      const $listItem = $( this ).parents( 'li:first' );
      if ( this.value === '' ) {
        let errorMessage = 'This is a required field';
        if ( $( this ).is( '.conditional' ) ) {
          errorMessage += ', when its related checkbox is checked';
        }
        $( '<span></span>' ).addClass( 'error-message' ).text( errorMessage ).appendTo( $listItem );
        $listItem.addClass( 'warning' );
      }
    }
    if ( $( this ).is( '#email' ) ) {
      const $listItem = $( this ).parents( 'li:first' );
      if ( ( this.value !== '' ) && !/.+@.+\.[a-zA-Z]{2,4}$/.test( this.value ) ) {
        const errorMessage = 'Please use proper e-mail format (e.g. megatron@cybertron.local)';
        $( '<span></span>' ).addClass( 'error-message' ).text( errorMessage ).appendTo( $listItem );
        $listItem.addClass( 'warning' );
      }
    }
  });

  $( 'form' ).submit( function() {
    $( '#submit-message' ).remove();
    $( ':input.required' ).trigger( 'blur' );
    const numWarnings = $( '.warning', this ).length;
    if ( numWarnings ) {
      const fieldList = [];
      $( '.warning label' ).each( function() {
        fieldList.push( $( this ).text() );
      });
      $( '<div></div>' )
        .attr({ id: 'submit-message', class: 'warning' })
        .append( `Please correct errors with ${numWarnings} fields:<br/>` )
        .append( `&bull; ${fieldList.join( '<br/>&bull; ' )}`)
        .insertBefore( '#send' )
      ;
      return false;
    }
  })

  $( '<li></li>' )
    .html( '<label><input type="checkbox" id="discover-all" /> <em>check all</em></label>')
    .prependTo( 'li.discover > ul' )
  ;
  $( '#discover-all' )
    .click( function() {
      const $checkboxes = $( this ).parents( 'ul:first' ).find( ':checkbox' );
      if ( this.checked ) {
        $( this ).next().text( 'un-check all' );
        $checkboxes.attr( 'checked', true );
      } else {
        $( this ).next().text( 'check all' );
        $checkboxes.attr( 'checked', '' );
      }
    })
    .parent( 'label' )
    .css({ borderBottom: '1px solid #ccc', color: '#777', lineHeight: 2 })
  ;

  const $searchText = $( '#search-text' );
  const searchLabel = $( '#search label' ).remove().text();
  $searchText.attr( 'autocomplete', 'off' );
  $searchText
    .addClass( 'placeholder' )
    .val( searchLabel )
    .focus( function() {
      if ( searchLabel === this.value ) {
        $( this ).removeClass( 'placeholder' ).val( '' );
      }
    })
    .blur( function() {
      if ( '' === this.value ) {
        $( this ).addClass( 'placeholder' ).val( searchLabel );
      }
    })
  ;
  $( '#search' ).submit( function() {
    if ( searchLabel === $searchText.val() ) {
      $searchText.val( '' );
    }
  });
  const $autocomplete = $( '<ul class="autocomplete"></ul>' ).hide().insertAfter( '#search-text' );
  let selectedItem = null;
  const setSelectedItem = function( item ) {
    selectedItem = item;
    if ( null === selectedItem ) {
      $autocomplete.hide();
      return;
    }
    if ( selectedItem < 0 ) {
      selectedItem = 0;
    }
    if ( selectedItem >= $autocomplete.find( 'li' ).length ) {
      selectedItem = $autocomplete.find( 'li' ).length - 1;
    }
    $autocomplete.find( 'li' ).removeClass( 'selected' ).eq( selectedItem ).addClass( 'selected' );
    $autocomplete.show();
  };
  $searchText
    .keyup( function( event ) {
      if ( event.which > 40 || event.which === 8 ) {
        $.ajax({
          url: '/c08/bookstore/search/autocomplete.php',
          data: {'search-text': $('#search-text').val()},
          dataType: 'json',
          type: 'post',
          success: function (data) {
            if (data.length) {
              $autocomplete.empty();
              $.each(data, function (index, term) {
                $('<li></li>')
                  .addClass('clickable')
                  .text(term)
                  .appendTo($autocomplete)
                  .mouseover(function () {
                    setSelectedItem(index);
                  })
                  .click(function () {
                    $searchText.val(term);
                    $autocomplete.hide();
                  })
                ;
              });
              setSelectedItem(0);
            } else {
              setSelectedItem(null);
            }
          }
        });
      } else if ( event.which === 38 && selectedItem !== null ) {
        setSelectedItem( selectedItem - 1 );
        event.preventDefault();
      } else if ( event.which === 40 && selectedItem !== null) {
        setSelectedItem( selectedItem + 1 );
        event.preventDefault();
      } else if ( event.which === 27 && selectedItem !== null ) {
        setSelectedItem( null );
      }
    })
    .keypress( function( event ) {
      if ( event.which === 13 && selectedItem !== null ) {
        populateSearchField();
        event.preventDefault();
      }
    })
    .blur( function( event ) {
      setTimeout( function() {
        setSelectedItem( null );
      }, 250 );
    })
  ;

  const $quantityInput = $( '.quantity input' );
  const $cartTbodyTr = $( '#cart tbody tr' );
  $( '#recalculate' ).hide();
  stripe();
  $quantityInput
    .keypress( function( event ) {
      if ( event.which && ( event.which < 48 || event.which > 57 ) ) {
        event.preventDefault();
      }
    })
    .change( function() {
      let totalQuantity = 0;
      let totalCost = 0;
      $cartTbodyTr.each( function() {
        let price = parseFloat( $( '.price', this ).text().replace( /^[^\d.]*/, '' ) );
        price = isNaN( price ) ? 0 : price;
        let quantity = parseInt( $( '.quantity input', this ).val() );
        let cost = quantity * price;
        $( '.cost', this ).text( formatCost( cost ) );
        totalQuantity += quantity;
        totalCost += cost;
      });

      $( '.subtotal .cost' ).text( formatCost( totalCost ) );
      const taxRate = ( parseFloat( $( '.tax .price' ).text() ) / 100 );
      const tax = ( Math.ceil( totalCost * taxRate * 100 ) / 100 );
      $( '.tax .cost' ).text( formatCost( tax ) );
      totalCost += tax;
      $( '.shipping .quantity' ).text( String( totalQuantity ) );
      const shippingRate = parseFloat( $( '.shipping .price' ).text().replace( /^[^\d.]*/, '' ) )
      const shipping = totalQuantity + shippingRate;
      $( '.shipping .cost' ).text( formatCost( shipping ) );
      totalCost += shipping;
      $( '.total .cost' ).text( formatCost( totalCost ) );
    })
  ;

  $( '<th>&nbsp;</th>' ).insertAfter( '#cart thead th:nth-child( 2 )' );
  $cartTbodyTr
    .each( function() {
      const $deleteButton = $( '<img/>' )
        .attr({
          src: '../assets/img/icons/cross.png',
          class: 'clickable',
          alt: 'remove from cart',
          title: 'remove from cart',
          width: '16px',
          height: '16px'
        })
        .click( function() {
          $( this )
            .parents( 'tr' )
            .find( '.quantity input' )
            .val( 0 )
            .trigger( 'change' )
            .end()
            .hide()
          ;
          stripe();
        })
      ;
      $( '<td></td>' ).insertAfter( $( 'td:nth-child( 2 )', this ) ).append( $deleteButton );
    })
  ;
  $( '<td>&nbsp;</td>' ).insertAfter( '#cart tfoot td:nth-child( 2 )' );

  $( '#shipping-name' ).click( editShipping );

  // **************************************************************************************************************** //

  function populateSearchField() {
    $searchText.val( $autocomplete.find( 'li' ).eq( selectedItem ).text() );
    setSelectedItem( null );
  }
  function formatCost( cost ) {
    return `$${cost.toFixed( 2 )}`;
  }
  function stripe() {
    $( '#cart tbody tr:visible:even' ).removeClass( 'odd').addClass( 'even' );
    $( '#cart tbody tr:visible:odd' ).removeClass( 'even' ).addClass( 'odd' );
  }
  function editShipping() {
    $.get( 'shipping.php', function( data ) {
      $( '#shipping-name' ).remove()
      $( data ).hide().appendTo( '#shipping' ).slideDown();
      $( '#shipping form' ).submit( saveShipping );
    });
    return false;
  }
  function saveShipping() {
    const postData = $( '#shipping :input' ).serialize()
    $.post( 'shipping.php', postData, function( data ) {
      $('#shipping form' ).remove();
      $( data ).appendTo( '#shipping' );
      $( '#shipping-name' ).click( editShipping );
    });
    return false;
  }
})( jQuery );