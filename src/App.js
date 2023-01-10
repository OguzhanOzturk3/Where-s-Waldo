import { type } from '@testing-library/user-event/dist/type';
import { createElement } from 'react';
import ps2 from './img/ps.jpg';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { useState, useEffect } from "react";


function App() {

  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);

  const [coords, setCoords] = useState();
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);


  useEffect(() => {

    if (score == 3) {
      setRunning(false);

      const finis_dom = document.createElement("h1");
      const parents = document.getElementsByClassName("end-score")[0];

      finis_dom.textContent = "Finished at " + ("0" + Math.floor((time / 60000) % 60)).slice(-2) + ":" + ("0" + Math.floor((time / 1000) % 60)).slice(-2) + ":" + ("0" + ((time / 10) % 100)).slice(-2);
      console.log("Finished at " + ("0" + Math.floor((time / 60000) % 60)).slice(-2) + ":" + ("0" + Math.floor((time / 1000) % 60)).slice(-2) + ":" + ("0" + ((time / 10) % 100)).slice(-2));
      parents.appendChild(finis_dom);
    }
  }, [score]);



  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDgTf9R0LyyuM_Lt14L4dODQ3vSeLugSSk",
    authDomain: "waldo-49e8f.firebaseapp.com",
    projectId: "waldo-49e8f",
    storageBucket: "waldo-49e8f.appspot.com",
    messagingSenderId: "397908372184",
    appId: "1:397908372184:web:0cbc17885f6e1c238405ad"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  const db = getFirestore(app);

  // Get a list of cities from your database



  async function testwrite() {

    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }


  }









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
    setCoords({ x, y });

    console.log(coords);

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





  };

  async function testread(btn_val) {
    const querySnapshot = await getDocs(collection(db, "characters"));


    console.log(querySnapshot.docs[btn_val].data())
    return (querySnapshot.docs[btn_val].data());

  }




  async function checkLocation(e) {
    const score_board = document.getElementsByClassName('score')[0];
    const btn_val = e.target.value;


    const char_cor = await testread(btn_val);
    console.log(char_cor.x2);



    if (coords.x >= char_cor.x1 && coords.x <= char_cor.x2 && coords.y >= char_cor.y1 && coords.y <= char_cor.y2) {
      console.log("CORRECT!!");
      setScore(score + 1);

      const true_selected = document.getElementById(`${btn_val}`);
      true_selected.remove();

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
      <div className='timer'>
        <p>Score:{score}</p>

        <span>  {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
       
      </div>
      <div className='score'> <h1>Your Score is: {score}</h1></div>
      <div className='end-score'></div>
      <img onClick={getLocation} className='image' src={ps2}></img>



      <div className='btn'>
        <div className='box-area'>

        </div>

        <div className='btn-items'>
          <button id='0' value='0' onClick={checkLocation}>Kratos</button>
          <button id='1' value='1' onClick={checkLocation}>Solid Snake</button>
          <button id='2' value='2' onClick={checkLocation}>Spiderman</button>

        </div>

      </div>
    </div>
  );
}

export default App;
