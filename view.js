var SocialCountResults = React.createClass({
  getInitialState: function() {
    return {
      test: "hello, world",
      uri: "https://builtvisible.com/messages-in-the-deep/",
      twitter: "",
      uriList: []
    };
  },
  handleChange: function( event ) {
    this.setState({ uri: event.target.value });
  },
  getData: function(e) {
    e.preventDefault();
    
    $.ajax({
       url: 'https://cors-anywhere.herokuapp.com/zorg.builtvisible.com/tools/scrs/json',
       data: {
         'api_key': '65b608cf38b638ea71cf4c9baad182ae',
         'url': this.state.uri
       },
       success: function( data ) {

         var info = {
           'fb-share' : data.Facebook.share_count,
           'twitter' : data.Twitter,
           'linkedin' : data.LinkedIn
         };
         console.log( "results: ", info );
         this.setState({ "twitter": info.twitter, "fb-share": info["fb-share"] })
       }.bind(this),
       error: function( xhr, status, error) {
         console.error(status, error.toString());
         return error;
       }.bind(this)
     });

  },
  render: function() {
    return (
        <tr>
          <td className="uri">
            <label htmlFor="unique2">{this.state.uri}</label>
            <input type="text" id="unique2" value={this.state.uri} onChange={this.handleChange}  />
            <button className="btn" onClick={this.getData}>Go</button>
          </td>
          <td className="fb">1</td>
          <td className="twitter">2 + {this.state.twitter}</td>
          <td className="linkedin">3</td>
        </tr>
    );
  }
});

React.render(
  <SocialCountResults />,
  document.getElementById('scrs')
);


