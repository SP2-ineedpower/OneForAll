import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="your name"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>your name is {this.state.value}</p>
      </div>
    );
  }
}



class Main extends React.Component {
    render() {
        return (
          
          <div>
            <h2>iNeedPower</h2>
            <p>project under construction ....</p>
            <NameForm></NameForm>
            </div>
        );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Main />,
    document.getElementById('root')
  );
  