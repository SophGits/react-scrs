// function getData( uri ){

//   var results = [];

//   $.ajax({
//     url: 'https://cors-anywhere.herokuapp.com/zorg.builtvisible.com/tools/scrs/json',
//     data: {
//       'api_key': '65b608cf38b638ea71cf4c9baad182ae',
//       'url': uri
//     }
//   }).success( function( data ) {
//     console.log( "data: ", data);
//     info = {
//       'fb-share' : data.Facebook.share_count,
//       'twitter' : data.Twitter,
//       'linkedin' : data.LinkedIn
//     };
//     console.log( "results: ", info );
//     results.push(info);
//   }).fail( function( error) {
//     console.log( "error: ", error );
//     return error;
//   })
//   .always( function( data ) {
//     // alert( "complete" );
//     console.log(data);
//   });

//   return results;
// };



 // $.ajax({
 //      url: 'https://cors-anywhere.herokuapp.com/zorg.builtvisible.com/tools/scrs/json',
 //      data: {
 //        'api_key': '65b608cf38b638ea71cf4c9baad182ae',
 //        'url': this.state.uri
 //      },
 //      success: function( data ) {
 //        var info = {
 //          'fb-share' : data.Facebook.share_count,
 //          'twitter' : data.Twitter,
 //          'linkedin' : data.LinkedIn
 //        };
 //        console.log( "results: ", info );
 //        this.setState({ "twitter": info.twitter, "fb-share": info["fb-share"] })
 //      }.bind(this),
 //      error: function( xhr, status, error) {
 //        console.error(status, error.toString());
 //        return error;
 //      }.bind(this)
 //    });
