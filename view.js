var SocialCountResults = React.createClass({
  getInitialState: function() {
    return {
      uri: "https://builtvisible.com/messages-in-the-deep/",
      twitter: "",
      dataArray: [{Twitter: 56, url: 'www.hi.com', LinkedIn: 22, Facebook: { total_count: 12 } }, {Twitter: 5, url: 'www.hello.com', LinkedIn: 2, Facebook: { total_count: 3 } }]
    };
  },
  handleChange: function( event ) {
    this.setState({ uri: event.target.value });
  },
  foo: function (index, f) {
    console.log("something: ", index, f);

    var currentArray = this.state.dataArray;
    currentArray[index].url = f;
// debugger
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
         'url': this.state.uri
       },
       success: function( data ) {

         console.log( "results: ", data );
         // this.setState({ data: data })

         var dataArray = this.state.dataArray.concat(data)

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
        <ResultsList data={this.state.dataArray} onFoo={this.foo} />
        <tr>
          <td className="uri">
            <label htmlFor="u2">{this.state.uri}</label>
            <input type="text" id="u2" value={this.state.uri} onChange={this.handleChange}  />
            <button className="btn" onClick={this.getData}>Go</button>
          </td>
          <td className="fb">1</td>
          <td className="twitter">{this.state.twitter}</td>
          <td className="linkedin">3</td>
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
        <span className="resultList">
          {resultNodes}
        </span>
      );
    }
});

// render the individual results in the store

var Result = React.createClass({
  hello: function(e) {
    e.preventDefault();
    if (e.which === 13) {
      this.props.secondFoo(this.props.index, e.target.value);
    }
  },
  hi : function() {
    console.log("because i have to provide change handler");
    // this.props.obj.url = this.value;
  },
  render: function() {
    return <tr className="Result">
      <td className="uri">
        <label htmlFor="unique2">{this.props.obj.url}&nbsp;{this.props.index}&nbsp;</label>
        <input type="text" id="unique2" defaultValue={this.props.obj.url} onKeyPress={this.hello}  />
        <button className="btn" onClick={this.getData}>Go</button>
      </td>
      <td className="fb">{this.props.obj.Facebook.total_count}</td>
      <td className="twitter">{this.props.obj.Twitter}</td>
      <td className="linkedin">{this.props.obj.LinkedIn}</td>
    </tr>
  }
});

React.render(
  <SocialCountResults />,
  document.getElementById('scrs')
);

