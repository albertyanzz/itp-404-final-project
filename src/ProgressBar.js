import React from 'react';

export default function ProgressBar({ totalValue, currValue=0, children: setColor }) {

    return (
      <div>
        <div
          className="progress"
          style={{ height: "50px", width: "250px", borderRadius: "50px" }}
        >
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${(currValue * 100) / totalValue}%`,
              backgroundColor: "green !important",
            }}
            ref={setColor}
            aria-valuenow={currValue}
            aria-valuemin={0}
            aria-valuemax={totalValue}
          >
            {`${currValue}/${totalValue}`}
          </div>
        </div>
      </div>
    );
};