import './App.css';
import playButton from './playButton.png'
import pauseButton from './pauseButton.png'
import React, {useState, useEffect } from 'react';
import { wait } from '@testing-library/user-event/dist/utils';

function App() {

  const [buttonState, setButtonState] = useState(0);

  const [currentTimeSeconds, setCurrentTimeSeconds] = useState(1499);

  const [currentTime, setCurrentTime] = useState("25:00");
  const [period, setPeriod] = useState(2);

  const [intervalSpeed, setItervalSpeed] = useState(1000)

  let minutes = 0;
  let seconds = 0;

  useEffect(() => {

 
  const interval = setInterval(() => {

    

    if(buttonState === 1){

 

      setCurrentTimeSeconds(currentTimeSeconds - 1)

      minutes =parseInt(currentTimeSeconds / 60, 10)
      seconds = currentTimeSeconds % 60



      if(minutes >= 0 && seconds >= 0){

       

        if(minutes < 10 && seconds < 10){

          
          setCurrentTime("0" + minutes + ":" + "0" + seconds)
        }
        else if(minutes < 10){
       
          setCurrentTime("0" + minutes + ":" +  seconds)
        }
        else if(seconds < 10){
         
          setCurrentTime( minutes + ":" + "0" + seconds)
        }
        else{
          setCurrentTime( minutes + ":" +  seconds)
        }
      
      }
      else{
        setButtonState(0)
   
        setPeriod(period + 1);
        changeTimeDuration()
        updateBars()

       

        
      }

    }
  }, intervalSpeed);

  return () => clearInterval(interval);
  },);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '1') {
        setItervalSpeed(1)
      }
      else if(event.key==='2'){
        setItervalSpeed(1000)

      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  },);

  const changeTimeDuration = () => {

    var currentBar = document.getElementById("App");
    currentBar.style.filter = "invert(1)";
    setTimeout(() => {
        currentBar.style.filter = "invert(0)";
    }, 250); 
    
    setTimeout(() => {
        currentBar.style.filter = "invert(1)";
    }, 500); 
    
    setTimeout(() => {
        currentBar.style.filter = "invert(0)";
    }, 750);


    if(period === 1 || period === 3 || period === 5 || period === 7 || period === 9){
      setCurrentTimeSeconds(1499)
      setCurrentTime("25:00")
      setItervalSpeed(1000)
    }
    else if(period === 2 || period === 4 || period === 6){
      setCurrentTimeSeconds(299)
      setCurrentTime("05:00")
      setItervalSpeed(1000)
    }
    else if(period === 8){
      setCurrentTimeSeconds(1799)
      setCurrentTime("30:00")
      setItervalSpeed(1000)

    }
  }

  const updateBars = () => {

    let currentBar = document.getElementById("indic" + (period -1))
    currentBar.style.backgroundColor = "rgba(255, 255, 255, 0.625)";

    if(period === 9){
      setPeriod(1)
    }

    
  }

   const changeButton = () => {

    if(buttonState === 0){
      setButtonState(1)   

      if(period === 1){
        setPeriod(2)
 
    

        var currentBar
        for (let i = 1; i <= 8; i++) {

         currentBar = document.getElementById("indic" + i)
          currentBar.style.backgroundColor = "rgba(162, 157, 157, 0.2)"
          
        }
       

  
      }
    }
    else{


      setButtonState(0)

  
    }

  }
  
  return (
    <div className="App" id="App">

      <div id='timerDiv'>
        <h1 id='time'>{currentTime}</h1>
      </div>

      <div id='indicatorDiv'>

        <div id="indic1"></div>
        <div id="indic2"></div>
        <div id="indic3"></div>
        <div id="indic4"></div>
        <div id="indic5"></div>
        <div id="indic6"></div>
        <div id="indic7"></div>
        <div id="indic8"></div>


      </div>

      <div id='buttonDiv'>
   
        <button id='button'>

        {buttonState === 0 ? (
       <img src={playButton} onClick={changeButton} id="plyabutton"></img>
        ) : <img src={pauseButton} onClick={changeButton} id="pauseButton"></img>  }
     
        </button>


      </div>
      
    </div>
  );
}

export default App;
