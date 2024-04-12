import React from 'react'

export default function History({historyRef}) {
  return (
    <div id={"history-container"}>
        <ol className="history-list-container" ref={historyRef}></ol>
    </div>
  )
}
