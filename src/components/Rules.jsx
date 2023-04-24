import React, { useState } from 'react'
import '../App.css'

//font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

const Rules = () => {
    const [showRules, setShowRules] = useState(false);

    const toggleRules = () => {
        setShowRules(!showRules)
    }

    return (
        <div className='rules-container'>
          <div onClick={toggleRules}>
            <FontAwesomeIcon icon={faLightbulb} className='icon' />
          </div>
         
          {showRules && (
            <div className='rules-window'>
              <h2>Rules</h2>
              <p className='game-context'>
                Hang-bro is a word-re-generating game where a random word is generated and the other player tries to guess it by
                suggesting letters within a certain number of attempts. The rules are as follows:
              </p>
              <ol>
                <li>One random word is being generated and pulled from a dictionary</li>
                <li>
                  The other player tries to guess the word by suggesting letters one at a time.
                </li>
                <li>
                  If the guessed letter is in the word, the letter will be presented in the lower bar and no part of the hangman
                  figure is drawn
                </li>
                <li>
                  If the guessed letter is not in the word, it will be marked as a wrong letter and a part of the hangman figure
                  will be drawn the hangman figure. The number of wrong guesses are: 6
                </li>
                <li>
                  The game continues until the guessing player either correctly guesses the word or completes the hangman figure,
                  in which case they lose the game.
                </li>
              </ol>
            </div>
          )}
        </div>
      );
    };
    
    export default Rules;





