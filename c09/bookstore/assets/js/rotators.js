'use strict';
(function( $ ) {
  // News feed
  $( '#news-feed' )
    .each( function() {
      const $this = $( this );
      $this.empty();
      const totalHeight = $this.height();
      const fadeHeight = $( '#news-feed' ).height() / 4;
      for ( let i = 0; i < fadeHeight; i += 2 ) {
        $( '<div></div>' )
          .css({
            opacity: i / fadeHeight,
            top: totalHeight - fadeHeight + i
          })
          .addClass( 'fade-slice' )
          .appendTo( this )
        ;
      }

      const $newsLoading = $( '<img/>' )
        .attr({
          src: '/c09/bookstore/assets/img/loading.gif',
          alt: 'loading... please wait', })
        .addClass( 'news-wait' )
      ;
      $this
        .ajaxStart( function() {
          $this.append( $newsLoading );
        })
        .ajaxStop( function() {
          $newsLoading.remove();
        })
      ;
      $.ajax({
        url: '/c09/bookstore/assets/data/feed.php',
        type: 'get',
        dataType: 'xml',
        success: function(data) {
          $('/rss//item', data).each(function () {
            const title = $('title', this).text();
            const linkText = $('link', this).text();
            let $link = $('<a></a>').attr('href', linkText).text(title);
            $link = $('<h3></h3>').html($link);
            const pubDate = new Date($('pubDate', this).text());
            const pubMonth = pubDate.getMonth() + 1;
            const pubDay = pubDate.getDate();
            const pubYear = pubDate.getFullYear();
            const pubDiv = $('<div></div>').addClass('publication-date').text(`${pubMonth}/${pubDay}/${pubYear}`);
            const summaryText = $('description', this).text();
            const $summary = $('<div></div>').addClass('summary').html(summaryText);

            $('<div></div>')
              .addClass('headline')
              .append($link)
              .append(pubDiv)
              .append($summary)
              .appendTo('#news-feed')
            ;
          });
        },
        complete: function() {
          const $newsFeed = $( '#news-feed' );
          let currentHeadline = 0;
          let oldHeadline = 0;
          let headlineTimeout;
          let rotateInProgress = false;
          const hiddenPosition = $newsFeed.height() + 10;
          const headlineCount = $( 'div.headline' ).length;
          $( `div.headline:eq(${currentHeadline})` ).css( 'top', '0' );

          const headlineRotate = function() {
            if ( !rotateInProgress ) {
              rotateInProgress = true;
              headlineTimeout = false;
              currentHeadline = (oldHeadline + 1) % headlineCount;
              $(`div.headline:eq(${oldHeadline})`)
                .animate({top: -hiddenPosition}, 'slow', function () {
                  $(this).css('top', hiddenPosition);
                })
              ;
              $(`div.headline:eq(${currentHeadline})`)
                .animate({top: 0}, 'slow', function () {
                  rotateInProgress = false;
                  if ( !headlineTimeout ) {
                    headlineTimeout = setTimeout(headlineRotate, 5e3);
                  }
                })
              ;
              oldHeadline = currentHeadline;
            }
          };
          headlineTimeout = setTimeout( headlineRotate, 5e3 );

          $newsFeed
            .hover( function() {
              clearTimeout( headlineTimeout );
              headlineTimeout = false;
            }, function() {
              if ( !headlineTimeout ) {
                headlineTimeout = setTimeout( headlineRotate, 250 );
              }
            })
          ;
        }
      });
    })
  ;

  // Image slider
  const spacing = 140;

  const $closeButton = createControl( '../bookstore/assets/img/close.gif' );
  const $leftRollover = createControl( '../bookstore/assets/img/left.gif' );
  const $rightRollover = createControl( '../bookstore/assets/img/right.gif' );
  const $enlargeRollover = createControl( '../bookstore/assets/img/enlarge.gif' );
  const $enlargedCover = $( '<img/>' ).addClass( 'enlarged' ).hide().appendTo( 'body' );
  const $priceBadge = $( '<div></div>' ).addClass( 'enlarged-price' ).css({ display: 'none', opacity: 0.6 }).appendTo( 'body' );
  const $waitThrobber = $( '<img/>' ).attr( 'src', '../bookstore/assets/img/wait.gif' ).addClass( 'control' ).css( 'z-index', 4 ).hide();

  $( '#featured-books' )
    .css({
      width: spacing * 3,
      height: '166px',
      overflow: 'hidden'
    })
    .find( '.covers a' )
    .css({
      float: 'none',
      position: 'absolute',
      left: 1e3
    })
  ;

  const setUpCovers = function() {
    const $covers = $( '#featured-books .covers a' );
    $covers.unbind( 'click' ).unbind( 'mouseover' ).unbind( 'mouseout' );

    $covers
      .eq( 0 )
      .css( 'left', 0 )
      .click( function( event ) {
      $covers.eq( 0 ).animate({ left: spacing }, 'fast' );
      $covers.eq( 1 ).animate({ left: spacing * 2 }, 'fast' );
      $covers.eq( 2 ).animate({ left: spacing * 3 }, 'fast' );
      $covers.eq( $covers.length - 1 )
        .css( 'left', -spacing )
        .animate({ left: 0 }, 'fast', function() {
          $( this ).prependTo( '#featured-books .covers' );
          setUpCovers();
      });
      event.preventDefault();
    })
      .hover( function() {
        $leftRollover.appendTo( this ).show();
      }, function() {
        $leftRollover.hide();
      })
    ;

    $covers
      .eq( 2 )
      .css( 'left', spacing * 2 )
      .click( function( event ) {
      $covers.eq( 0 ).animate({ left: -spacing }, 'fast', function() {
          $( this ).appendTo( '#featured-books .covers' );
          setUpCovers();
      });
      $covers.eq( 1 ).animate({ left: 0 }, 'fast' );
      $covers.eq( 2 ).animate({ left: spacing }, 'fast' );
      $covers.eq( 3 ).css( 'left', spacing * 3 ).animate({ left: spacing * 2 }, 'fast' );

      event.preventDefault();
    })
      .hover( function() {
        $rightRollover.appendTo( this ).show();
      }, function() {
        $rightRollover.hide();
      })
    ;

    $covers
      .eq( 1 )
      .css( 'left', spacing )
      .click( function(  event ) {
        $waitThrobber.appendTo( this ).show();
        const $body = $( 'body' );
        const price = $( this ).find( '.price' ).text();
        let element = $( this ).find( 'img' ).get( 0 );
        let coverWidth = element.width;
        let coverHeight = element.height;
        let coverLeft = 0;
        let coverTop = 0;

        while( element.offsetParent ) {
          coverLeft += element.offsetLeft;
          coverTop += element.offsetTop;
          element = element.offsetParent;
        }

        $enlargedCover
          .attr({
            src: $( this ).attr( 'href' )
          })
          .css({
            left: coverLeft,
            top: coverTop,
            width: coverWidth,
            height: coverHeight
          })
        ;

        const animateEnlarge = function() {
          $waitThrobber.hide();
          $enlargedCover
            .animate({
              left: ($body.width() - coverWidth * 3) / 2,
              top: 100,
              width: coverWidth * 3,
              height: coverHeight * 3
            }, 'normal', function () {
              $enlargedCover.one('click', function () {
                $closeButton.unbind('click').hide();
                $priceBadge.hide();
                $enlargedCover.fadeOut();
              });
              $closeButton
                .addClass('enlarged-control')
                .css({
                  left: ($body.width() - coverWidth * 3) / 2,
                  top: 100
                })
                .click(function () {
                  $enlargedCover.click();
                })
                .show()
                .appendTo('body')
              ;
              $priceBadge
                .css({
                  right: ($body.width() - coverWidth * 3) / 2,
                  top: 100
                })
                .text(price)
                .show()
              ;
            })
          ;
        };

        if ( $enlargedCover[0].complete ) {
          animateEnlarge();
        } else {
          $enlargedCover.bind( 'load', animateEnlarge );
        }
        event.preventDefault();
      })
      .hover( function() {
        $enlargeRollover.appendTo( this ).show();
      }, function() {
        $enlargeRollover.hide();
      })
    ;
  };
  setUpCovers();

  // **************************************************************************************************************** //

  function createControl( src ) {
    return $( '<img/>' )
      .attr( 'src', src )
      .addClass( 'control' )
      .css( 'opacity', 0.6 )
      .css( 'display', 'none' )
    ;
  }

})( jQuery );