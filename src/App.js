import './App.css';
import './MediaQuery.css';
import { useState, useEffect, useRef } from 'react';
import Header from './components/header.js'
import Controls from './components/controls.js';
import Gameboard from './components/gameboard.js';
import Level from './components/level.js'
import Toggle from './components/toggle.js';
import History from './components/history.js'
import Hints from './components/hints.js'
import Moves from './components/moves.js'
//dataset
let tiles = [{
  id: 1,
  color: 'red',
  alternate: 'hotpink',
  sound: './sounds/beep-04.mp3'
},
{
  id: 2,
  color: 'green',
  alternate: 'lime',
  sound: './sounds/beep-05.mp3'
},
{
  id: 3,
  color: 'blue',
  alternate: 'cyan',
  sound: './sounds/beep-08b.mp3'
},
{
  id: 4,
  color: 'yellow',
  alternate: 'tan',
  sound: './sounds/beep-09.mp3'
}]
//Customized functions
function autoTextFn(text, heading) {
  text = [...text]//text.split``
  let i = 0, arr = [], len = text.length
  let timer = setInterval(() => {
    let take = text.shift(text[i])
    i += 1
    arr.push(take)
    heading.textContent = arr.join``
    // console.log(text)//sender
    // console.log(arr)//receiver
    // console.log(arr.length,len)//compare arr's length w/ original text length
    if (arr.length === len) clearInterval(timer)//clearInterval once both lengths are the same.
  }, 35)
}
function App() {
  //HTML References
  const movesRef = useRef();
  const hintsRef = useRef();
  const tilesRef = useRef()
  const resetRef = useRef()
  const controlRef = useRef()
  const myTileRef = useRef()
  const headingRef = useRef()
  const subRef = useRef()
  const playRef = useRef()
  const backgroundRef = useRef()
  const historyRef = useRef();
  let start_count = 750
  
  //states
  const [hints,setHints] = useState(3);
  const [level, setLevel] = useState(0)
  const [comp, setComp] = useState([])
  const [comp_speed, setComp_speed] = useState(start_count)
  const [comp_tile_delay, setComp_tile_delay] = useState(comp_speed / 2)
  // eslint-disable-next-line
  const [color, setColor] = useState(tiles.map((_, i) => _.color))
  const [gameStarted, setGameStarted] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [index, setIndex] = useState(0)
  const [bg_count,setBg_Count] = useState(0)
  const [bg, setBg] = useState({background:undefined,color:undefined})
  
  //____________________________________________
  //useEffects
  useEffect(()=>{
    let body = document.querySelector('body')
    if(bg_count %2 === 0){
      setBg({background:`var(--black-color)`,color:`var(--white-color)`})
      body.style=`background:${bg.background};color:${bg.color}`
      subRef.current.style = `color:${bg.color}`
    }
    // eslint-disable-next-line
  },[bg_count])
  useEffect(() => {
    if (gameStarted) {//Once the game starts, the tiles look darker.
      subRef.current.textContent = '';
      [...tilesRef.current.children].forEach(t=>{
        t.classList.remove('deactivated-default')
        t.classList.add('deactivated-ready')
      })
      resetRef.current.classList.remove('disabled')
      if(hints < 3){
        setHints(hints+1)
      }
    }
    else {
      [...tilesRef.current.children].forEach(t=>{
        t.classList.remove('deactivated-ready')
        t.classList.add('deactivated-default')
      })
      resetRef.current.classList.add('disabled')
      resetRef.current.classList.add('no-pointer')
      setComp([...comp, randomColor()])//load your colors before the game starts
      autoTextFn('Try to beat all 15 rounds!', subRef.current)
      playRef.current.classList.remove('disabled') //after text fn is complete, play button appears
    }// eslint-disable-next-line
  }, [gameStarted])
  useEffect(() => {
    //Modify computer_speed
    if ((level > 0) && (level % 3 === 0)) {
      //computer_speed increases my 150ms every 4 rounds.
      //computer's tap delay = If level < 9 return (computer speed / 2), else 225 (minimum delay speed)
      setComp_speed(count => count - 75)
      setComp_tile_delay(delay => level < 9 ? delay - 37.5 : 225)
    }
    else {
      setComp_speed(comp_speed)
    }// eslint-disable-next-line 
  }, [level])
  useEffect(() => {
    if (!disabled) {
      tilesRef.current.classList.remove('no-pointer')
    }
    else {
      tilesRef.current.classList.add('no-pointer')
    }
  }, [disabled])
  //____________________________________________
  //action creators
  const randomColor = () => {
    let random = color[Math.floor(Math.random() * color.length)]
    return random
  }
  const startGame = (e) => {
    gameInitialized(e)
    playRound()
    resetRef.current.classList.add('no-pointer')
    fetch('/clear-data')
    let arr = [...historyRef.current.children]
    arr.forEach(li=>{
      let children = [...li.children]
      children = [...children].forEach(child=>{
        li.removeChild(child)
      })
      li.parentNode.removeChild(li)
    })
  }
  const gameInitialized = (e) => {
    resetRef.current.classList.add('no-pointer')
    subRef.current.textContent = ''
    setGameStarted(true)
    setDisabled(true)
    let play = e.target
    let controlWrapper = controlRef.current
    play.classList.add('disabled')//Play button disappears
    controlWrapper.classList.remove('space-evenly')
    controlWrapper.classList.add('centered')
  }
  const playRound = () => {
    autoTextFn('Wait for Computer', subRef.current)
    setComp([...comp, randomColor()])//Return an additional randomColor() onto the computer's sequence.
    setLevel(level + 1)//level increments by 1 after passing a level
    activate(comp)//activate the computer's sequence
    humanTurn(level)
  }
  const humanTurn = (level) => {
    setTimeout(() => {
      setDisabled(false)
      movesRef.current.classList.remove("his-hide")
      movesRef.current.classList.add("his-show")
      resetRef.current.style='opacity:1;transition:.25s;'
      resetRef.current.classList.remove('no-pointer')
      autoTextFn('Your turn', subRef.current)
    }, level > 1 ? ((((level % 8) / comp_speed * 100) + 2) * 1000) + 1500 : ((((level % 8) / comp_speed * 100) + 2) * 1000))
  }
  const activate = (array) => {
    resetRef.current.style='opacity:.25;transition:.25s;'
    resetRef.current.classList.add('no-pointer')
    array.forEach((tile, i) => {
      setTimeout(() => {
        blink(tile, i)
      }, (i + 1) * comp_speed)
    })
  }
  const blink = (col) => {
    const number = {
      red:'one',
      green:'two',
      blue:'three',
      yellow:'four'
    }
    let elem = document.getElementById(`${col}`)
    elem.classList.add("push-down")
    elem.classList.add(`${number[col]}`)
    elem.classList.remove('deactivated-ready')
    setTimeout(() => {
      elem.classList.remove("push-down")
      elem.classList.remove(`${number[col]}`)
      elem.classList.add('deactivated-ready')
    }, comp_tile_delay)
  }
  const climateChange = (e) => {
    e.preventDefault()
    setBg_Count(b => b+1)
    console.log(bg_count)
    let btn = backgroundRef.current
    let body = document.querySelector('body')
    setBg(bg_count%2===0 ? {background:`var(--black-bg)`,color:`var(--white-color)`} : {background:`var(--white-bg)`,color:`var(--black-color)`})
    if(bg_count%2===0&&bg_count>0){
      btn.classList.toggle('slider-night')
    }
    else{
      btn.classList.toggle('slider-night')
    }
    body.style=`background:${bg.background};color:${bg.color}`
    subRef.current.style = `color:${bg.color}`
  }
  

  //_____________________________________________

  return (
    <div className="App">
      <Moves {...{index,level, movesRef}}/>
      <Hints {...{hintsRef,hints,setHints,historyRef,level}}/>
      <History {...{historyRef}}/>
      <Toggle {...{backgroundRef,climateChange}}/>
      <Header {...{ headingRef, subRef }} />
      <Gameboard {...{
        movesRef,
        historyRef,
        hints,
        setHints,
        tiles,//tiles Object {}
        resetRef,
        comp_speed,//useStates based on speed (int)
        setComp_speed,
        comp_tile_delay,
        setComp_tile_delay,
        start_count,

        setDisabled,//useStates based on booleans
        gameStarted,
        setGameStarted,

        activate,//activate function() is passed to mimic the blinking effect after clicking on a tile
        playRound,
        autoTextFn,

        tilesRef,//useRef()
        myTileRef,
        subRef,
        playRef,
        controlRef,

        comp,//useStates based on computer's sequence (array), index (int) & level (int), bg (int)
        setComp,
        index,
        setIndex,
        level,
        setLevel,
        bg,
        setBg,
        bg_count
      }} />

      <Controls {...{
        resetRef,//useRef()
        controlRef,
        playRef,
        subRef,

        randomColor,//functions passed from parent (App.js)
        startGame,
        autoTextFn,

        comp,//useStates based on computer's sequence (array), gameStarted (bool), disabled (bool) & level (int)
        setComp,
        setGameStarted,
        disabled,
        setDisabled,
        level,
        setLevel,

        comp_speed,//useStates based on speed (int)
        setComp_speed,
        setComp_tile_delay,
        start_count
      }} />
      <Level {...{ level }} />
    </div>
  );
}

export default App;