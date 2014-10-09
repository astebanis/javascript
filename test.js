// https://github.com/astebanis/javascript

var test = new function() {
  this.fail = function( message ) {
    throw new Error( message );
  };
  if( typeof( $ ) != 'function' ||
    typeof( $().jquery ) != 'string' )
      this.fail( 'jquery not found' );
};

// http://api.jquery.com/jQuery.ajax/
// https://developer.github.com/v3/

test.run = function( file ) {
  $.ajax( {
    url : 'https://api.github.com/repos/astebanis/javascript/contents/' + file,
    error : function( request ) {
      test.fail( request.statusText ? request.statusText : 'request failed' );
    },
    success : function( data ) {
      try { console.log( atob( data.content.replace( /\n+/g, '' ) ) ); }
      catch( error ) { test.fail( 'parsing response failed' ); }
    },
    headers : {
      Accept : 'application/vnd.github.v3+json'
    }
  } );
  return test;
};

test.run( 'test.js' );
