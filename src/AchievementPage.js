import React, { useContext, useEffect } from "react";
import AchievementItem from './AchievementItem';
import { DataStoreContext } from "./contexts";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";


export default function AchievementPage(){
    const { isLoggedIn } = useContext(DataStoreContext);

    useEffect(() => {
		document.title = "Achievements | Microplanner"
	}, [])

    if(isLoggedIn) {
        return (
          <div>
            <div className="row topTitle" id="achievementTitle">
              Achievements
            </div>
            <div className="achievementsList">
                <AchievementItem
                    icon={faTrophy}
                    iconColor="yellow"
                    backgroundColor="red"
                    name="Task streak"
                    maxProgress="10"
                    progress="2"
                >
                    {"Complete 10 tasks"}
                </AchievementItem>
            </div>
          </div>
        );
    }

    else {
        return (
        <div className="justify-content-center">
			<div className="row centerTitle" id="achievementTitle">
				Sign in to see achievements!
			</div>
		</div>
        )
    }
}