import React, { useState, useEffect } from 'react';
import './App.css';

//import dictionary
import dictionary from './Assets/dictionary.txt'

// IMPORT COMPONENTS
import Header from './components/Header';
import WrongLetters from './components/WrongLetters';
import Figure from './components/Figure';
import Notify from './components/Notify';
import Message from './components/Message';
import Rules from './components/Rules';
import { showNotification as show } from './helper/helper';

//min and max of letters required for the game 
const MIN_WORD_LENGTH = 5;
const MAX_WORD_LENGTH = 12;

function App() {
  //useState
  const [wrongLetters, setWrongLetters] = useState([]);
  const [words, setWords] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [ playable, setPlayable ] = useState(true);
  const [selectedWord, setSelectedWord] = useState("");
  const [showNotification, setShowNotification] = useState(false);



    //useEffect to fetch words when component mounts. fetch contents from txt file
    useEffect(() => {
      async function fetchWords() {
        try {
          const response = await fetch(dictionary);
          const text = await response.text();
          const words = text.split('\n').map(word => word.trim());
          setWords(words);
        } catch (error) {
          console.error(error);
          setPlayable(false)
        }
      }
  
      fetchWords();
    }, []);
  
  
  
    //Select a random word from the words array
    //filtered words to only use words longer than 5 letters and shorter than 12 letters
    useEffect(() => {
      if (words.length > 0) {
        const filteredWords = words.filter(word => word.length >= MIN_WORD_LENGTH && word.length <= MAX_WORD_LENGTH);
        const randomIndex = Math.floor(Math.random() * filteredWords.length);
        setSelectedWord(filteredWords[randomIndex]);
      }
    }, [words]);

   //addeventlistener to enable typing
   useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      
      //if statement to display letters inside the given key code area as per the keyboard
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
  
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            //show notification if letter has already been added to correct letter span 
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentWrongLetters => [...currentWrongLetters, letter]);
          } else {
            //show notification if letter has already been added to Wrong letters span
            show(setShowNotification);
          }
        }
      }
    };
    //Keydown event listener to recognise typed letters (Letters only no symbols)
    window.addEventListener('keydown', handleKeydown);
  
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, selectedWord, playable, wrongLetters]);

  //set playable to true
  function playAgain(){
    setPlayable(true);

    //empty the Arrays for correct and wrong letters
    setCorrectLetters([]);
    setWrongLetters([])

    //will regenerate new word
    let random = Math.floor(Math.random() * words.length);
    setSelectedWord(words[random])
  }
  

  return (
    <div className="App">
    
    {/* Access typed letter and display  */}
      <div className="word" id="word">
      {selectedWord ? selectedWord.split('').map((letter, i) => (
        <span className="letter" key={i}>
          {correctLetters.includes(letter) ? letter : ''}
        </span>
      )) : null}
    
    {/* Render all components */}
    </div>
      <Header />
      <div className="game-container">
          <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
         
      </div>
      <Rules />
      <Message correctLetters={correctLetters} wrongLetters={wrongLetters} 
        selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
      <Notify showNotification={showNotification} />
      
    </div>
  );
}

export default App;
