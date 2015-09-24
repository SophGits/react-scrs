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
  handleChange: function( event ) {
    var wholeState = this.state;
    wholeState.url = event.target.value;
    // console.log(wholeState.url);
    this.setState({ newData: wholeState });
  },
  foo: function (index, bar) {
    console.log("something: ", index, bar);

    var currentArray = this.state.dataArray;
    currentArray[index].url = bar;

    this.setState({ dataArray: currentArray });
    this.getDataFromExistingRecord(index, bar);

    console.log(this.state.dataArray);
    // do setState instead
    // but you have to make the array, change the stuff, then setState it all
  },
  getDataFromExistingRecord: function( index, uri) {
   $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/zorg.builtvisible.com/tools/scrs/json',
      data: {
        'api_key': APIKEY,
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
         'api_key': APIKEY,
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
   hello: function(e) {
    /*
    e.preventDefault();
    */
    if (e.which === 13) {
      e.preventDefault();
      // this.props.onFoo(this.props.index, e.target.value);
    }
  },
  render: function() {
    return (
     <table>
       <thead>
         <tr>
           <th>URI</th>
           <th>fb</th>
           <th>twitter</th>
           <th>linkedin</th>
         </tr>
       </thead>

       <tbody>
         {
           this.state.dataArray.map(function(result, index) {
             return (
               <Result
                 obj={result}
                 index={index}
                 key={index}/>
             )
           }, this)
         }

         <tr>
           <td className="uri">
             <label htmlFor="u2">{this.state.newData.url}</label>
             <input
               id="u2"
               onChange={this.handleChange}
               onKeyPress={this.hello}
               type="text"
               value={this.state.newData.url}
             />
             <button
               className="btn"
               onClick={this.getData}
             >
               Go
             </button>
           </td>
           <td className="fb"></td>
           <td className="twitter">{this.state.newData.Twitter}</td>
           <td className="linkedin">{this.state.newData.LinkedIn}</td>
         </tr>
       </tbody>
     </table>
    );
  }
});
// above: render list of <tr> nodes, plus the editable one


var Result = React.createClass({
  render: function() {
    return (
      <tr className="Result">
        <td className="uri">
          <label htmlFor="u2">{this.props.obj.url}&nbsp;{this.props.index}</label>
          <input type="text" id="u2" value={this.props.obj.url} onChange={this.hello} onKeyPress={this.handleChange}  />
          <button className="btn" onClick={this.getData}>Go</button>
        </td>
        <td className="fb">{this.props.obj.Facebook.total_count}</td>
        <td className="twitter">{this.props.obj.Twitter}</td>
        <td className="linkedin">{this.props.obj.LinkedIn}</td>
      </tr>
    );
  }
});


React.render(
  <SocialCountResults />,
  document.getElementById('scrs')
);

