import React, { useState, useContext } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { AuthContext } from "../contexts/AuthProvider";
/***************************************************************************************
 *  REFERENCES
 *
 *  Title: react-native-paper
 *  Author: Callstack
 *  Date: 12/12/2022
 *  Code version: v5.x
 *  URL: https://github.com/callstack/react-native-paper
 *  Software License: MIT License
 ***************************************************************************************/

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text variant="displaySmall" style={styles.title}>
        Welcome to Foodie
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          mode="outlined"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          label="Password"
          mode="outlined"
          autoCapitalize="none"
          value={password}
          onChangeText={(pword) => setPassword(pword)}
          style={styles.input}
          secureTextEntry={true}
        />
        <Button
          mode="contained"
          onPress={() => login(email, password)}
          style={styles.loginButton}
        >
          Login
        </Button>
        <Button
          mode="flat"
          style={styles.signUpButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          Don't have an account? Sign up
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    marginTop: "10%",
    textAlign: "center",
  },
  inputContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  input: {
    width: "75%",
    marginBottom: 10,
  },
  loginButton: {
    width: "75%",
    marginTop: 20,
  },
  signUpButton: {
    marginTop: 10,
  },
});
