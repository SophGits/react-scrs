(function(){

  var foo = 'https://builtvisible.com/messages-in-the-deep/';
  var bar = {};

  $.ajax({
    url: 'https://cors-anywhere.herokuapp.com/zorg.builtvisible.com/tools/scrs/json',
    data: {
      'api_key': '65b608cf38b638ea71cf4c9baad182ae',
      'url': foo
    }
  }).success( function( data ) {
    console.log( "data: ", data);
    bar = {
      'fb-share' : data.Facebook.share_count ,
      'twitter' : data.Twitter,
      'linkedin' : data.LinkedIn
    };
    console.log( "results: ", bar );
    return bar;
  }).fail( function( error) {
    console.log( "error: ", error );
  })
  .always( function() {
    // alert( "complete" );
  });


})();
