import React, { useContext, useEffect, useState } from "react";
import AchievementItem from './AchievementItem';
import { DataStoreContext } from "./contexts";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";


export default function AchievementPage(){
    const { isLoggedIn, achievements, userId } = useContext(DataStoreContext);
    const [userAchievements, setUserAchievements] = useState({tasks_completed: "0"});

    useEffect(() => {
      document.title = "Achievements | Microplanner";
      const currentAchievements = achievements.find((achievement) => {
        return achievement.user_id === userId;
      });

      setUserAchievements(currentAchievements);
	  }, [achievements, userId])

    if(isLoggedIn) {
        return (

          <div>
            <div className="row topTitle" id="achievementTitle">
              Achievements
            </div>

            {userAchievements &&
            <div className="achievementsList">
                <AchievementItem
                    icon={faTrophy}
                    iconColor="yellow"
                    backgroundColor="red"
                    name="Task streak"
                    maxProgress="10"
                    progress={userAchievements.tasks_completed > 10 ? 10 : userAchievements.tasks_completed}
                >
                    {"Complete 10 tasks"}
                </AchievementItem>
            </div>
            }
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