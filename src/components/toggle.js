import React from 'react'

export default function Toggle({backgroundRef,climateChange}) {
  return (
    <div className="toggle-container" onClick={climateChange}>
        <div className="toggle btn-toggle">
          <span id="slider" className="slider-day" ref={backgroundRef}></span>
        </div>
      </div>
  )
}
