import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthProvider.js";
import { LoginStack, RecipeStack } from "./Stacks.js";
/***************************************************************************************
 *  REFERENCES
 *
 *  Title: Firebase authstate takes long to authenticate user on slow connection - React Native
 *  Author: OssenCoder
 *  Date: 4/12/2022
 *  Code version: N/A
 *  URL: https://stackoverflow.com/questions/71842757/firebase-authstate-takes-long-to-authenticate-user-on-slow-connection-react-na
 *  Software License: N/A
 * 
 *  Title: Architecting Mobile Web Apps (Google I/O'19)
 *  Author: Firebase
 *  Date: 5/9/2019
 *  Code version: N/A
 *  URL: https://youtu.be/NwY6jkohseg?t=1411
 *  Software License: N/A
 *  
 *  Title: react-native-async-storage
 *  Author: React Native Community
 *  Date: 12/5/2022
 *  Code version: 1.17.11
 *  URL: https://github.com/react-native-async-storage/async-storage
 *  Software License: MIT License

 ***************************************************************************************/

const Routes = () => {
  // Set an initializing state while Firebase connects
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [previousUser, setPreviousUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    AsyncStorage.setItem("user", JSON.stringify(user));
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    AsyncStorage.getItem("user").then((value) => {
      if (value) {
        setPreviousUser(true);
        setUser(JSON.parse(value));
      } else {
        setPreviousUser(false);
      }
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing && !user) {
    return (
      <NavigationContainer indepedent={true}>
        <LoginStack />
      </NavigationContainer>
    );
  }

  if (initializing && user) {
    return (
      <NavigationContainer independent={true}>
        <RecipeStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {!initializing && user ? <RecipeStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default Routes;
