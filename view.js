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
  getData: function() {
debugger

    var apiKey = '65b608cf38b638ea71cf4c9baad182ae';
    var url = 'https://cors-anywhere.herokuapp.com/zorg.builtvisible.com/tools/scrs/json' + '&api_key=' + apiKey + '&url=' + this.state.uri
    $.getJSON(url, function(result) {
      alert("hi");
      if(!result || !result.data || !result.data.length){
        alert("error");
          return;
      }

      var info = {
        'fb-share' : result.Facebook.share_count,
        'twitter' : result.Twitter,
        'linkedin' : result.LinkedIn
      };
      this.setState({ "twitter": info.twitter, "fb-share": info["fb-share"] })
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


