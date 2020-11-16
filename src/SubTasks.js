import React, { useEffect, useState, useContext } from "react";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataStoreContext } from "./contexts";

export default function SubTasks({ name, id, taskId, removeSubtask }) {
  const [taskCompleted, setTaskCompleted] = useState(false);
  const { deleting } = useContext(DataStoreContext);

  async function completeTask() {
    setTaskCompleted(true);

    removeSubtask(id, taskId);
  }

  useEffect(() => {
    setTaskCompleted(false);
  }, []);

  return (
    !taskCompleted && (
      <div className="taskItemList">
        <div className="subTaskName">{name}</div>

        <button
          className="w3-button"
          disabled={deleting}
          onClick={completeTask}
        >
          <FontAwesomeIcon icon={faCheckSquare} color="black" size="2x" />
        </button>
      </div>
    )
  );
}
