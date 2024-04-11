import React from 'react'

export default function History({historyRef}) {
  return (
    <div id={"history-container"}>
        <ol className="history-list-container" ref={historyRef}>
            
            {/* <li className="history-list-item">
                <div className="color green"></div>
            </li>
            <li className="history-list-item">
                <div className="color green"></div>
                <div className="color red"></div>
            </li>
            <li className="history-list-item">
                <div className="color green"></div>
                <div className="color red"></div>
                <div className="color blue"></div>
            </li>
            <li className="history-list-item">
                <div className="color green"></div>
                <div className="color red"></div>
                <div className="color blue"></div>
                <div className="color yellow"></div>
            </li> */}
        </ol>
    </div>
  )
}
