import React from 'react'

const WrongLetters = ({wrongLetters}) => {
  //renders wrongletters as a prop and then renders a div. inside 
  //maps over each letter in the wrong letters array and returns span
  // tag with the incorrect letters
  
    return (
      <div className="wrongLetters">
        {wrongLetters && wrongLetters.length > 0 && (
          <div>
            <p>Wrong</p>
            {wrongLetters.join(', ')}
          </div>
        )}
      </div>
    );
  };

export default WrongLetters;
