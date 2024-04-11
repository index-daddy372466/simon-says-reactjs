import { useEffect, React } from 'react'

export default function Hints({hintsRef,hints,setHints,historyRef,level}) {

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
const handleHint = () => {
  let arr = [...historyRef.current.children] || [];
  if(arr.length > 0){
    arr.forEach((item,x)=>{
      let btns = [...item.children];

      if(x===arr.length-1){
        setTimeout(()=>{
          // item.classList.add("trans-border")
          btns.forEach(btn=>{
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
        
        btns.forEach(btn=>{
          btn.classList.add('outline')
          btn.classList.remove("color-hidden")
        })
      }
    })
  }
  
return hints > 0 && level > 1 ? setHints(hints - 1) :  setHints(hints)
}

  return (
    <div id={"hints-container"}>
        <ul className="hints-btn-container his-show" ref={hintsRef}>
            {/* Schema for hints */}
            {
                Array(hints).fill(undefined).map((h,index)=>(
                  <div className="btn-cover" key={index} onClick={handleHint}>
                    <div className="material-symbols-outlined hints-btn">emoji_objects</div>
                  </div>
                ))
            }
            {/* <div className="btn-cover">
                <div className="hints-btn"></div>
            </div>
            <div className="btn-cover">
                <div className="hints-btn"></div>
            </div>
            <div className="btn-cover">
                <div className="hints-btn"></div>
            </div> */}
        </ul>
    </div>
  )
}
