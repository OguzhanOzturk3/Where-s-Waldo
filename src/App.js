import { type } from '@testing-library/user-event/dist/type';
import { createElement } from 'react';
import ps2 from './img/ps.jpg';
import { useState  } from "react";

function App() {
  let coords;

  const [score, setScore] = useState(0);
  const characters = {
    kratos: {
      x1: 59,
      x2: 64,
      y1: 54,
      y2: 57
    },
    spiderman: {
      x1: 14,
      x2: 21,
      y1: 50,
      y2: 52
    },
    solid_snake: {
      x1: 45,
      x2: 49,
      y1: 40,
      y2: 43
    }
  };






  const getLocation = (e) => {
    const target_box = document.getElementsByClassName('btn')[0];
    const box_area = document.getElementsByClassName('box-area')[0];
    console.log(target_box);

    const x = Math.round((e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100);
    const y = Math.round((e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100);
    coords = { x, y };



    console.log("height width scale" + e.nativeEvent.target.offsetWidth);

    target_box.style.top = e.nativeEvent.offsetY - Math.round(e.nativeEvent.target.offsetHeight * 0.0053) + 'px';
    target_box.style.left = e.nativeEvent.offsetX - Math.round(e.nativeEvent.target.offsetWidth * 0.0208) + 'px';
    target_box.style.display = 'flex';

    if (e.nativeEvent.target.offsetWidth < 450) {

      target_box.style.top = e.nativeEvent.offsetY - Math.round(e.nativeEvent.target.offsetHeight * 0.0103) + 'px';
      target_box.style.left = e.nativeEvent.offsetX - Math.round(e.nativeEvent.target.offsetWidth * 0.0988) + 'px';
    }

    box_area.style.height = Math.round(e.nativeEvent.target.offsetHeight * 0.0133) + 'px';
    box_area.style.width = Math.round(e.nativeEvent.target.offsetWidth * 0.0288) + 'px';




    console.log(coords);
  };



  const checkLocation = (e) => {
    const score_board = document.getElementsByClassName('score')[0];
    const btn_val = e.target.value;
    console.log(characters[btn_val]);


    if (coords.x >= characters[btn_val].x1 && coords.x <= characters[btn_val].x2 && coords.y >= characters[btn_val].y1 && coords.y <= characters[btn_val].y2) {
      console.log("CORRECT!!");
      setScore(score+1);
      e.target.style.visibility = "hidden";
   
      
    }
    else {
      console.log("FALSE!!");

    }
  

  
  
    
console.log("aaaaa")



score_board.classList.add("slidein");
    setTimeout(() => {
      score_board.classList.remove("slidein");
    }, 1500);


    

  };


  


  



  return (
    <div className="test">
      <div className='score'> <h1>Your Score is: {score}</h1></div>
      <img onClick={getLocation} className='image' src={ps2}></img>
     


      <div className='btn'>
        <div className='box-area'>

        </div>

        <div className='btn-items'>
          <button value='kratos' onClick={checkLocation}>Kratos</button>
          <button value='spiderman' onClick={checkLocation}>Spiderman</button>
          <button value='solid_snake' onClick={checkLocation}>Solid Snake</button>
        </div>

      </div>
    </div>
  );
}

export default App;
