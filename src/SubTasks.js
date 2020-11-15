import React, { useEffect, useState } from "react";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SubTasks({name, id, taskId, removeSubtask}){

    const [taskCompleted, setTaskCompleted] = useState(false);

    async function completeTask(){
        console.log("completed " + name);
        setTaskCompleted(true);

        removeSubtask(id, taskId);
    }

    useEffect(() => {
        setTaskCompleted(false);
    }, [])

	return (
        

        <div className="taskItemList">
		    <div>
            {name}
        </div>
        {!taskCompleted && 
        <div className="w3-button" onClick={completeTask}>
            <FontAwesomeIcon icon={faCheckSquare} color="black" size="2x" />
        </div>
        }
    </div>
  );
}