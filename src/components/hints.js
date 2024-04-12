import { useEffect, React } from 'react'

export default function Hints({popOutRef,hintsRef,hints,setHints,historyRef,level,gameStarted}) {
// use Effect
  useEffect(()=>{
    if(hints < 1){
      hintsRef.current.parentNode.classList.remove("his-show")
      hintsRef.current.parentNode.classList.add("his-hide")
    }
    else{
      hintsRef.current.parentNode.classList.add("his-show")
      hintsRef.current.parentNode.classList.remove("his-hide")
    }
    // eslint-disable-next-line
  },[hints])

//_________________________________________________

// action creators
const handleHint = () => {
  let arr = [...historyRef.current.children] || [];
  if(arr.length > 0){

    arr.forEach((item,x)=>{
      let btns = [...item.children];

      if(x===arr.length-1){
        setTimeout(()=>{
          // item.classList.add("trans-border")
          btns.forEach((btn)=>{
            return btn.classList.remove("color-hidden")
          })
          setTimeout(()=>{
            item.classList.remove("trans-border")
            btns.forEach(btn=>{
              return btn.classList.add("color-hidden")
            })
          },3000)
        },250)
      }
      else{
        if(gameStarted){
          btns.forEach(btn=>{
            btn.classList.add('outline')
            btn.classList.remove("color-hidden")
          })
          // settimeout to have outlines disappear
          setTimeout(()=>{
            btns.forEach((btn,index)=>{
              btn.classList.remove('outline')
              btn.classList.add("color-hidden")
            })
          },3000)
        }
        
          
        
      }
    })



  }
  else{

    popOutRef.current.classList.remove("pop-in")
    popOutRef.current.classList.add("pop-out")
    setTimeout(()=>{
      popOutRef.current.classList.add("pop-in")
      popOutRef.current.classList.remove("pop-out")
    },3000)
  }
  
return hints > 0 && level > 1 ? setHints(hints - 1) :  setHints(hints)
}

  return (
    <div id={"hints-container"}>
    <div ref={popOutRef} className="pop-in hint-message">Hints are available after round 1<h4> </h4></div>
        <ul className="hints-btn-container his-show" ref={hintsRef}>
            {/* Schema for hints */}
            {
                Array(hints).fill(undefined).map((h,index)=>(
                  <div className="btn-cover" key={index} onClick={handleHint}>
                    <div className="material-symbols-outlined hints-btn">emoji_objects</div>
                  </div>
                ))
            }
        </ul>
    </div>
  )
}
