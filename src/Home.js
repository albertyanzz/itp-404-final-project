import React, { useEffect, useContext } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { DataStoreContext } from "./contexts";
import { fetchUsers, saveAchievement, saveUser } from "./api";
import { motion } from "framer-motion";

export default function Home() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setCurrUser,
    userName,
    setUserName,
    setUserId,
    createSuccessNotification,
  } = useContext(DataStoreContext);

  const responseGoogle = (response) => {
    console.log(response);
  };

  useEffect(() => {
    document.title = "Home | Microplanner";

    function handleLogout() {
      setIsLoggedIn(false);
      setCurrUser(null);

      createSuccessNotification("Log out success!", "See you soon!");
    }

    async function onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
      // var id_token = googleUser.getAuthResponse().id_token

      setIsLoggedIn(true);
      setCurrUser(profile.getEmail());
      setUserName(profile.getGivenName());

      //find user id here

      fetchUsers().then((data) => {
        const user = data.find((data) => {
          return data.email === profile.getEmail();
        });

        if (user) {
          //exists
          setUserId(user.id);
        } else {
          const newUser = {
            username: profile.getEmail(),
            email: profile.getEmail(),
          };

          saveUser(newUser).then(() => {
            fetchUsers().then((data) => {
              const addedUser = data.find((data) => {
                return data.email === profile.getEmail();
              });
              saveAchievement({
                user_id: addedUser.id,
                tasks_completed: 0,
              });
              setUserId(addedUser.id);
            });
          });
        }

        createSuccessNotification("Sign in success!", "Welcome back!");
      });
    }

    ReactDOM.render(
      isLoggedIn ? (
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_SIGNIN_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_SIGNIN_CLIENT_ID}
          buttonText={isLoggedIn ? "Logged in!" : "Login"}
          onSuccess={onSignIn}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      ),
      document.getElementById("googleButton")
    );
  }, [
    setIsLoggedIn,
    isLoggedIn,
    setCurrUser,
    setUserName,
    setUserId,
    createSuccessNotification,
  ]);

  return (
    <div className="homeContainer">
      <motion.div
        className="row homeFont homeItem"
        initial={{ y: -100, opacity: 0.1 }}
        animate={{ y: [-60, -30, -10, -5, -1, -0.5, 0], opacity: 1 }}
        transition={{
          ease: "easeIn",
          duration: 1,
        }}
      >
        Microplanner
      </motion.div>
      <div id="googleButton"></div>
      <div className="welcomeText">{isLoggedIn && `Welcome, ${userName}!`}</div>
    </div>
  );
}
