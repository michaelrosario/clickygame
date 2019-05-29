import React from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import options from "./options.json";
import "./App.css";

class App extends React.Component {

  state = {
    options,
    score: 0,
    highScore: 0
  }

  handleCard = id => {
    
    const options = this.state.options.sort(() => Math.random() - 0.5);
    let score = this.state.score;
    let highScore = this.state.highScore;
    
    for (var i in options) {
      if (options[i].id === id) {
        if(options[i].selected){
          score = 0;
          this.resetGame();
          break;
        } else {
          // score up
          score++;
          if(score > highScore){
            highScore = score;
          }
          options[i].selected = true;
        }
        break; //Stop this loop, we found it!
      }
    }
    this.setState({ options, score, highScore });
  }

  resetGame = () => {

    console.log("Game resets");
    const options = this.state.options;
    for (var i in options) {
       options[i].selected = false;
    }

    this.setState({ 
      options
    });
    
  }

 
  render(){

    const { options } = this.state;

    const cardOptions = options.map(option => (
      <Card {...option} clickCard={this.handleCard} key={option.id} />
    ));

    return (
      <Wrapper>
       
          <h1 className="title">Clicky Game</h1>
          <p>Score: {this.state.score} of {this.state.options.length} &nbsp; | &nbsp; Highest Score: {this.state.highScore}</p>
          <div className="wrapper-content">  
            {cardOptions}
          </div>
      </Wrapper>
    );
  }
}

export default App;
