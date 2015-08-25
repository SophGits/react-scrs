var SocialCountResults = React.createClass({
  getInitialState: function() {
    return {
      blankData: { "Facebook": { "share_count": 0, "like_count": 0, "comment_count": 0, "total_count": 0}, "Twitter": 0, "LinkedIn": 0, "Pinterest": 0, "StumbleUpon": 0, "GooglePlusOne": 0, "BufferApp": 0, "url": ""}, 
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
      ]
    };
  },
  handleChange: function( event ) {
    var wholeState = this.state;
    wholeState.url = event.target.value;
    // console.log(wholeState.url);
    this.setState({ newData: wholeState });
  },
  foo: function (index, f) {
    console.log("something: ", index, f);

    var currentArray = this.state.dataArray;
    currentArray[index].url = f;

    this.setState({ dataArray: currentArray });
    this.getDataFromExistingRecord(index, f);

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
        var orig = this.state.dataArray;
        orig[index] = data;
        this.setState({ dataArray: orig })
        // debugger
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

        var dataArray = this.state.dataArray;
        dataArray.push(data);
        this.setState({ dataArray: dataArray });
        // this.render();
       }.bind(this),
       error: function( xhr, status, error) {
         console.error(status, error.toString());
         return error;
       }.bind(this)
     });

  },
  yo: function(e) {
    if (e.which === 13) {
      e.preventDefault();
      // this.foo(this.state.dataArray.index, e.target.value);
    } 
  },
  render: function() {
    return (
      <tbody>
        <ResultsList data={this.state.dataArray} onFoo={this.foo} />
        <tr>
          <td className="uri">
            <label htmlFor="u2">{this.state.newData.url}</label>
            <input type="text" id="u2" value={this.state.newData.url} onChange={this.handleChange} onKeyPress={this.yo}  />
            <button className="btn" onClick={this.getData}>Go</button>
          </td>
          <td className="fb"></td>
          <td className="twitter">{this.state.newData.Twitter}</td>
          <td className="linkedin">{this.state.newData.LinkedIn}</td>
        </tr>
      </tbody>
    );
  }
});
// above: render list of <tr> nodes, plus the editable one


// render all results (in <tr></tr> nodes)
var ResultsList = React.createClass({
  render: function() {
      var that = this;
      var resultNodes = this.props.data.map(function(result, index) {
        return (
          <Result obj={result} index={index} key={index} secondFoo={that.props.onFoo}></Result>
        );
      });
      return (
        <div className="resultList">
          {resultNodes}
        </div>
      );
    }
});

// render the individual results in the store

var Result = React.createClass({
  hello: function(e) {
    if (e.which === 13) {
      e.preventDefault();
      this.props.secondFoo(this.props.index, e.target.value);
    } 
  },
  hi : function() {
    console.log("because i have to provide change handler");
    // this.props.obj.url = this.value;
  },
  render: function() {
    return(
    <tr className="Result">
      <td className="uri">
        <label htmlFor="unique2">{this.props.obj.url}&nbsp;{this.props.index}&nbsp;</label>
        <input type="text" id="unique2" defaultValue={this.props.obj.url} onKeyPress={this.hello}  />
        <button className="btn" onClick={this.getData}>Go</button>
      </td>
      <td className="fb">{this.props.obj.Facebook.total_count}</td>
      <td className="twitter">{this.props.obj.Twitter}</td>
      <td className="linkedin">{this.props.obj.LinkedIn}</td>
    </tr>)
  }
});

React.render(
  <SocialCountResults />,
  document.getElementById('scrs')
);

