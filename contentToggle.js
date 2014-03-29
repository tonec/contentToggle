// ===============================
// Content Toggle
// ===============================

(function ( $ ) {

	$.fn.contentToggle = function ( options ) {

		var self = $( this );

		options = $.extend( {
			init: 'first', // 'first', 'all' or 'none' 
			container: 'body',
			effect: 'hide',
			pairs: {},
			callback: ''
		}, options );

		var container = self.parents( options.container ),
			actionOpen, actionClose, isanimated, key;

		// Initial content to show and/or hide
		switch ( options.init ) {

			case 'none':
			break;

			case 'first':
				for ( key in options.pairs ) {
					if ( options.pairs.hasOwnProperty( key ) && typeof ( key ) !== 'function' ) {
						if ( options.pairs[ key ] !== CR.util.firstInObject( options.pairs ) ) {
							contentControl( $( options.pairs[ key ], container ), 'close' );
						}
					}
				}
			break;

			case 'all':
				for ( key in options.pairs ) {
					if ( options.pairs.hasOwnProperty( key ) && typeof ( key ) !== 'function' ) {
						contentControl( $( options.pairs[ key ], container ), 'close' );
					}
				}
			break;
		}

		this.delegate( 'input', 'click', function( event ) {
			var target = $( event.target ),
				targetContent = options.pairs[ event.target.value ];

			self.find( '.checked' ).removeClass( 'checked' );

			$( event.target ).parent().addClass( 'checked' );

			for ( var key in options.pairs ) {
				if ( options.pairs.hasOwnProperty( key ) && typeof ( key ) !== 'function' ) {
					contentControl( $( options.pairs[ key ], container ), 'close' );
				}
			}

			contentControl( $( targetContent, container ), 'open' );

			if ( options.callback ) options.callback();
		});

		function contentControl ( el, action ) {
			
			if ( isanimated ) return;

			isanimated = true;

			if ( action === 'close' ) {
				
				if ( options.effect === 'hide' ) el.hide();
				if ( options.effect === 'accordion' ) el.stop().slideUp();

				el.removeClass( 'open' );

			}

			if ( action === 'open' ) {
				if ( options.effect === 'hide' ) el.show();
				if ( options.effect === 'accordion' ) el.stop().slideDown();

				el.addClass( 'open' );
			}

			isanimated = false;
		}
	};
})( jQuery );