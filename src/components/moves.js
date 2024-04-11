import React from 'react'

export default function Moves({index,level,movesRef}) {
    return (
      <div id="moves-container" className="his-hide" ref={movesRef}>
        <h2 className="moves-actual">{level < 1 ? index+1 + " Move Left" 
                                    : (level)-(index) + " Moves Left"}</h2>
      </div>
    )
  }

