var SocialCountResults = React.createClass({
  getInitialState: function() {
    return {
      test: "hello, world",
      uriList: []
    };
  },
  render: function() {
    return (
      <table>
        <tr>
          <th>URI</th>
          <th>fb</th>
          <th>twitter</th>
          <th>linkedin</th>
        </tr>
        <tr>
          <td className="uri">
            <label htmlFor="unique">Looked-up URI</label>
            <input type="text" name="" id="unique" value="Lookup URI" />
            <button className="btn">Go</button>
          </td>
          <td className="fb">1</td>
          <td className="twitter">2</td>
          <td className="linkedin">3</td>
        </tr>

        <tr>
          <td className="uri">
            <label htmlFor="unique">{this.state.test}</label>
            <input type="text" name="" id="unique" value={this.state.test} />
            <button className="btn">Go</button>
          </td>
          <td className="fb">1</td>
          <td className="twitter">2</td>
          <td className="linkedin">3</td>
        </tr>
      </table>
    );
  }
});

React.render(
  <SocialCountResults />,
  document.getElementById('scrs')
);


