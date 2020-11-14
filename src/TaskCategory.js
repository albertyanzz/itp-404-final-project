import React from 'react';

export default function TaskCategory({name, count, id, toggleCategory}){

    function handleCategoryClick(){
        toggleCategory(id);
    }

	return (
        <div className="taskRow">
          <div className={`taskCount w3-circle w3-red`}>{count}</div>
          <div
            className="taskCategory w3-button"
            onClick={handleCategoryClick}
          >
            {name}
          </div>
        </div>
      );
}