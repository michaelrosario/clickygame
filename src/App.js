import React from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import options from "./options.json";
import "./App.css";

const INITIAL_STATE = {
  options,
  guessed: null,
  score: 0,
  highScore: 0
}

class App extends React.Component {

  state = { ...INITIAL_STATE };

  handleCard = id => {
  
    let {
      options,
      score,
      highScore,
      guessed
    } = this.state;

    // shuffle order
    options = options.sort(() => Math.random() - 0.5);


    for (var i in options) {
      if (options[i].id === id) {
        if(options[i].selected){
          score = 0;
          guessed = false;
          this.resetGame();
          break;
        } else {
          // score up
          score++;
          if(score > highScore){
            highScore = score;
          }
          guessed = true;
          options[i].selected = true;
        }
        break; //Stop this loop, we found it!
      }
    }
    this.setState({ options, score, highScore, guessed });
    setTimeout(() => {
      this.setState({guessed: null});
    }, 3500)
  }

  resetGame = () => {

    console.log("Game resets");
    const options = Object.assign({},INITIAL_STATE);

    this.setState({ 
      options,
      score: 0
    });

    setTimeout(() => {
      this.setState({ guessed: null });
    }, 3500)
    
  }

  render(){

    const { options } = this.state;

    const cardOptions = options.map(option => (
      <Card {...option} clickCard={this.handleCard} key={option.id} />
    ));

    return (

      <Wrapper>
          <h1 className="title">Clicky Game</h1>
          <p>
              Score: <strong>{this.state.score} of {this.state.options.length}</strong> 
              &nbsp; | &nbsp; 
              Highest Score: <strong>{this.state.highScore}</strong>
          </p>
          {this.state.score === this.state.options.length ? (
            <div>
              <h3>You won!!!</h3>
              <button onClick={this.resetGame}>Restart Game</button>  
            </div>) : ""}
          <p>
            <span className={this.state.guessed !== null ? (this.state.guessed ? "guesses correct show" : "guesses hide" ) : "guesses hide"}>You guessed correctly!</span>
            <span className={this.state.guessed !== null ? (this.state.guessed ? "guesses hide" : "guesses incorrect show" ) : "guesses hide"}>You guessed incorrectly!</span>
          </p>
          <div className={this.state.guessed !== null ? (this.state.guessed ? "wrapper-content" : "shake wrapper-content" ) : "wrapper-content"}>  
            {cardOptions}
          </div>
      </Wrapper>
      
    );
  }
}

export default App;
