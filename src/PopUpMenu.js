import React from "react";
import MenuItem from './MenuItem';
import { createPortal } from "react-dom";
import { faMedal, faListUl, faPlus, faHome } from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';


export default function PopUpMenu(){

    return createPortal(
      <motion.div 
        className="popUpMenu"
        initial={{ x: -130}}
        whileHover={{
            x: -60
        }}
        style={{width: "120%", paddingLeft: "40px"}}
      >
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
        <MenuItem
          iconColor="white"
          icon={faHome}
          backgroundColor="green"
          linkTo="/"
          tag="Home"
        ></MenuItem>
      </motion.div>,
      document.getElementById("menu")
    );
}