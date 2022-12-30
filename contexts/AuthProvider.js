import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
/***************************************************************************************
 *  REFERENCES
 *
 *  Title: Setting up email authentication with React Native, react-navigation, and Firebase
 *  Author: Aman Mittal
 *  Date: 10/1/2021
 *  Code version: N/A
 *  URL: https://blog.logrocket.com/email-authentication-react-native-react-navigation-firebase/
 *  Software License: N/A
 *
 *  Title: react-native-firebase
 *  Author: Salakar (Mike Diarmid) et al.
 *  Date: 12/7/2022
 *  Code version: 16.4.6
 *  URL: https://github.com/invertase/react-native-firebase
 *  Software License: Apache-2.0 License
 ***************************************************************************************/
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          if (email === "" || password === "") {
            Alert.alert(
              "Login error",
              "The login credentials provided were incomplete."
            );
            return;
          }
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            Alert.alert(
              "Login error",
              "The login credentials provided were incorrect."
            );
            console.log(e);
          }
        },
        register: async (email, password, password2) => {
          if (email === "" || password === "" || password2 === "") {
            Alert.alert("Incomplete information provided");
            return;
          }
          if (password !== password2) {
            Alert.alert("Passwords do not match");
            return;
          }
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then((userCredential) => {
                const userID = userCredential.user.uid;
                firestore().collection("users").doc(userID).set({
                  email: email,
                });
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
