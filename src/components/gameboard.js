import '../App.css'
import { useEffect,React } from 'react'

let human = []
export default function Gameboard({movesRef,hints,setHints,historyRef,resetRef,bg_count,tiles,tilesRef,start_count,comp_speed,setComp_speed,setComp_tile_delay,comp,setComp,index,setIndex,playRound,subRef,autoTextFn,setGameStarted,setLevel,playRef,controlRef,setDisabled,level}) {
  
  // useEffects
  useEffect(()=>{
    if(level < 1) {
      setDisabled(true)
    }// eslint-disable-next-line
  },[level])
  //_____________________________________
  // action creators
  const postFetch = async(api,d) => {
      const response = await fetch(api,
      {
        method:'POST',
        mode:"cors",
        cache:"no-cache",
        credentials: "same-origin", // include, *same-origin, omit
        headers: { "Content-Type": "application/json"},
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body:JSON.stringify(d),
      })
      // testing postFetch
      return response.json()
  }
  const appendTiles = (t,li,bool) => {
    let allTiles = document.querySelectorAll(".color")
    return [...t].forEach((ti,xray)=>{
      li.append(ti)
      historyRef.current.append(li)
      setTimeout(()=>{
        if(!bool){
          
          if(li.classList.contains("computer")){
            li.classList.add("correct-answer")
          }
          else{
            li.classList.add("wrong-answer")
            const hr = document.createElement("hr");
            const hr2 = document.createElement("hr");
            hr.classList.add("cross-out");
            hr2.classList.add("cross-out2");
            li.append(hr)
            li.append(hr2)
          }
          allTiles.forEach((til,index2)=>{
            setTimeout(()=>{
              til.classList.remove("color-hidden")
            },50*(index2+1))
          })
          ti.classList.remove("color-hidden")
        }
      },750 * (xray)+1)
    })
  }
  const clickFn = (e) => {
    // let audio = soundRef.current
    // console.log(comp)
    clicked(e.target.id)
    
    human.push(e.target.id)
    setIndex(index+1)

    // if the user messes up
    if(human[index]!==comp[index] && index < 14){
      
      let li_tiles = []
      let c_tile = []
      for(let i = 0; i < human.length; i++){
        // append history li's to ul and div to li
        let tile = document.createElement("div")
            tile.classList.add("color")
            tile.classList.add("color-hidden")
            tile.classList.add(human[i])
        let ct = document.createElement("div")
            ct.classList.add("color")
            ct.classList.add("color-hidden")
            ct.classList.add(comp[i])
            // console.log(tile)
            li_tiles.push(tile)
            c_tile.push(ct)
        }
        const li = document.createElement("li")
        const comp_li = document.createElement("li")
        li.classList.add(".history-list-container>li")
        comp_li.classList.add(".history-list-container>li")
        comp_li.classList.add("computer")
        appendTiles(li_tiles,li,false)
        appendTiles(c_tile,comp_li,false)

      gameOver('GAME OVER')
      postFetch('/fin-round',{round:[...human]}).then((data)=>{
        console.log(data)
      })
    }

    // if the user clears round
    else if(human[index]===comp[index] && human.length===comp.length-1 && level < 14){
      postFetch('/tracker',{tracker:e.target.id}).then((data)=>{
        console.log(data)
      })
      movesRef.current.classList.add("his-hide")
        movesRef.current.classList.remove("his-show")
      if(level > 3 && hints < 3 && level % 4 === 0){
        setHints(hints + 1)
      }
      let li_tiles = []
      for(let i = 0; i < human.length; i++){
      // append history li's to ul and div to li
      console.log(human[i])
      let tile = document.createElement("div")
          tile.classList.add("color")
          tile.classList.add("color-hidden")
          tile.classList.add(human[i])
          // console.log(tile)
          li_tiles.push(tile)
      }
      const li = document.createElement("li")
      li.classList.add(".history-list-container>li")
      console.log(li_tiles)
      appendTiles(li_tiles,li,true)


      postFetch('/round',{round:[...human]}).then((data)=>{
        console.log(data)

      })
      resetRef.current.style='pointer-events:none;opacity:.25;transition:.25s;'
      // console.log(human)
      human=[]
      setIndex(0)
      setDisabled(true)
      autoTextFn(`You passed level ${level}!`,subRef.current)
      setTimeout(()=>{
        playRound()
      },1500)
      }
      if(index === 14){
        gameOver('you win!')
        postFetch('/fin-round',{round:[...human]}).then((data)=>{
        })
        }

    }
  const gameOver = (txt) => {
    resetRef.current.style='pointer-events:none'
    start_count=750
    setDisabled(true)
    autoTextFn(txt,subRef.current)
    if(index === 14)subRef.current.style='color:green'
    else subRef.current.style='color:red'
    // playRef.current.classList.remove('disabled')
    // controlRef.current.classList.remove('centered')
    // controlRef.current.classList.add('space-evenly')
    setDisabled(true)
    setComp_speed(start_count)
    setComp_tile_delay(comp_speed/2)
    setComp([])
    human = []
    setTimeout(()=>{
      // setLevel(0)
      // setIndex(0)
      setGameStarted(false)
      subRef.current.style=`color:${bg_count%2===0 ? `var(--black-color)` : `var(--white-color)`}`
    },1750)

  }
  const clicked = (col) => {
    let elem = document.getElementById(`${col}`)
        elem.classList.remove('deactivated-ready')
      setTimeout(()=>{
        elem.classList.add('deactivated-ready')
      },150)

  }

  //________________________________________
  return (
    <>
      <div id="gameboard-container" ref={tilesRef}>
        {tiles.map((tile)=>(
          <div className="tile deactivated-default" onClick={clickFn} key={tile.id} id={tile.color} style={{backgroundColor:`${level>0&&level%4===0 ? tile.alternate : tile.color}`, transition:`.3s`}}>
          </div>
        ))}
      </div>
    </>
  )
}
