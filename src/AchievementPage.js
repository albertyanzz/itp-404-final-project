import React, { useContext } from "react";
import { DataStoreContext } from "./contexts";

export default function AchievementPage(){
    const { isLoggedIn } = useContext(DataStoreContext);

    if(isLoggedIn) {
        return (
            <div className="achievementsContainer">
                <div className="row topTitle" id="achievementTitle">
                    Achievements
                </div>
		    </div>
        )
    }

    else {
        return (
        <div className="achievementsContainer">
			<div className="row centerTitle" id="achievementTitle">
				Sign in to see achievements!
			</div>
		</div>
        )
    }
}