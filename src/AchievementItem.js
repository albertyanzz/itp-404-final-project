import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from './ProgressBar'

export default function AchievementItem({iconColor, icon, name, backgroundColor, maxProgress, progress, children: description}){

    return(
        <div className="achievementItem">
            <div className={`achievementIcon w3-circle w3-${backgroundColor}`}>
                <FontAwesomeIcon icon={icon} color={iconColor} size="2x" />
            </div>
            <div className="achievementDescription">
                {`${name} - (${description})`}
            </div>
            <div className="progressBar">
                <ProgressBar totalValue={maxProgress} currValue={progress}>
                    {
                        element => {
                        if (element)
                            element.style.setProperty(
                            "background-color",
                            maxProgress === progress ? "#09de1b" : "#32a8a8" ,
                            "important"
                            );
                        }
                    }
                </ProgressBar>
            </div>

        </div>
    )
}