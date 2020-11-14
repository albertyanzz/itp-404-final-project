import React from "react";
import TaskMenu from './TaskMenu';

export default function TaskItem(){

	return (
    <div className="taskRow">
      <div className={`taskCount w3-circle w3-red`}>10</div>
      <button
        className="taskCategory w3-button"
        data-toggle="collapse"
        data-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        School
      </button>
	  <div class="collapse" id="collapseExample">
		<div class="card card-body">
			Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
		</div>
	  </div>
      <div>
        <TaskMenu></TaskMenu>
      </div>
    </div>
  );
}