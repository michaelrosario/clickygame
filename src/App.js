import React from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import options from "./options.json";
import "./App.css";

class App extends React.Component {

  state = {
    options
  }

  handleCard = id => {
    const options = this.state.options.sort(() => Math.random() - 0.5);
    this.setState({ options });
  }

  render(){

    const { options } = this.state;

    const cardOptions = options.map(option => (
      <Card {...option} clickCard={this.handleCard} key={option.id} />
    ));

    return (
      <Wrapper>
        <h1 className="title">Clicky Game</h1>
        {cardOptions}

      </Wrapper>
    );
  }
}

export default App;
