import React from "react";
import MenuItem from './MenuItem';
import { createPortal } from "react-dom";
import { faMedal, faListUl, faPlus } from "@fortawesome/free-solid-svg-icons";


export default function PopUpMenu(){

    return createPortal(
      <div className="popUpMenu">
        <MenuItem
          iconColor="white"
          icon={faListUl}
          backgroundColor="blue"
          linkTo="/tasks"
          tag="Tasks"
        ></MenuItem>
        <MenuItem
          iconColor="yellow"
          icon={faMedal}
          backgroundColor="red"
          linkTo="/achievements"
          tag="Achievements"
        ></MenuItem>
        <MenuItem
          iconColor="black"
          icon={faPlus}
          backgroundColor="yellow"
          linkTo="/addtask"
          tag="Add Task"
        ></MenuItem>
      </div>,
      document.getElementById("menu")
    );
}