var SocialCountResults = React.createClass({
  getInitialState: function() {
    return {
      newData:
        {
          "Facebook": {
            "share_count": 0,
            "like_count": 0,
            "comment_count": 0,
            "total_count": 0
          },
          "Twitter": 0,
          "LinkedIn": 0,
          "Pinterest": 0,
          "StumbleUpon": 0,
          "GooglePlusOne": 0,
          "BufferApp": 0,
          "url": ""
        },
      dataArray: [
        {Twitter: 56, url: 'www.hi.com', LinkedIn: 22, Facebook: { total_count: 12 } },
        {Twitter: 5, url: 'www.hello.com', LinkedIn: 2, Facebook: { total_count: 3 } }
      ] // this could be data from a db
    };
  },
  foo: function (index, uri) {
    console.log("something: ", index, uri);

    var currentArray = this.state.dataArray;
    currentArray[index].url = uri;

    this.setState({ dataArray: currentArray });
    this.getDataFromExistingRecord(index, uri);

    console.log(this.state.dataArray);
    // do setState instead
    // but you have to make the array, change the stuff, then setState it all
  },
  getDataFromExistingRecord: function( index, uri) {
   $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/zorg.builtvisible.com/tools/scrs/json',
      data: {
        'api_key': '65b608cf38b638ea71cf4c9baad182ae',
        'url': uri
      },
      success: function( data ) {
        console.log( "results: ", data );
        var dataArray = this.state.dataArray;
        dataArray[index] = data;
        this.setState({ dataArray: dataArray })
        this.render();
      }.bind(this),
      error: function( xhr, status, error) {
        console.error(status, error.toString());
        return error;
      }.bind(this)
    });
  },
  getData: function(e) {
    if (e) { e.preventDefault();}

    $.ajax({
       url: 'https://cors-anywhere.herokuapp.com/zorg.builtvisible.com/tools/scrs/json',
       data: {
         'api_key': '65b608cf38b638ea71cf4c9baad182ae',
         'url': this.state.newData.url
       },
       success: function( data ) {

         console.log( "results: ", data );
         // this.setState({ data: data })

        var dataArray = this.state.dataArray.concat([data]);
        this.setState({ dataArray: dataArray });
        // this.render();
       }.bind(this),
       error: function( xhr, status, error) {
         console.error(status, error.toString());
         return error;
       }.bind(this)
     });

  },
  render: function() {
    return (
      <tbody>
        <ResultsList data={this.state.dataArray} onFoo={this.foo} storedData={this} getdata={this.getData} />

      </tbody>
    );
  }
});
// above: render list of <tr> nodes, plus the editable one


// render all results (in <tr></tr> nodes)
var ResultsList = React.createClass({
   hello: function(e) {
    /*
    e.preventDefault();
    */
    debugger
    if (e.which === 13) {
      e.preventDefault();
      this.props.onFoo(this.props.index, e.target.value);
    }
  },
  yo: function(e) {
    if (e.which === 13) {
      e.preventDefault();
      // this.foo(this.state.dataArray.index, e.target.value);
    }
  },
  handleChange: function( event ) {
    var wholeState = this.props.storedData.state;
    wholeState.url = event.target.value;
    // console.log(wholeState.url);
    this.props.storedData.setState({ newData: wholeState });
  },
  render: function() {
      var that = this;
      {/* stored data from props */}
      var resultNodes = this.props.data.map(function(result, index) {
        return (
          <tr className="Result">
            <td className="uri">
              <label htmlFor="unique2">{result.url}&nbsp;{index}&nbsp;</label>
              <input type="text" id="unique2" defaultValue={result.url} onKeyPress={this.hello}  />
              <button className="btn" onClick={this.hello}>Gogo</button>
            </td>
            <td className="fb">{result.Facebook.total_count}</td>
            <td className="twitter">{result.Twitter}</td>
            <td className="linkedin">{result.LinkedIn}</td>
          </tr>
        );
      });
      return (
        <div className="resultList">
          {/* using blank data to render empty input box */}
          <tr>
            <td className="uri">
              <label htmlFor="u2">{this.props.storedData.state.newData.url}</label>
              <input type="text" id="u2" value={this.props.storedData.state.newData.url} onChange={this.handleChange} onKeyPress={this.yo}  />
              <button className="btn" onClick={this.props.getdata}>Go</button>
            </td>
            <td className="fb"></td>
            <td className="twitter">{this.props.storedData.state.newData.Twitter}</td>
            <td className="linkedin">{this.props.storedData.state.newData.LinkedIn}</td>
          </tr>
          {resultNodes}
        </div>
      );
    }
});


React.render(
  <SocialCountResults />,
  document.getElementById('scrs')
);

