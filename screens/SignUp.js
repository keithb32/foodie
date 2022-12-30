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

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { register } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text variant="displaySmall" style={styles.title}>
        Create Account
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
          onChangeText={(password) => setPassword(password)}
          style={styles.input}
          secureTextEntry={true}
        />
        <TextInput
          label="Confirm Password"
          mode="outlined"
          autoCapitalize="none"
          value={password2}
          onChangeText={(password2) => setPassword2(password2)}
          style={styles.input}
          secureTextEntry={true}
        />
        <Button
          mode="contained"
          onPress={() => register(email, password, password2)}
          style={styles.button}
        >
          Create Account
        </Button>
      </View>
    </SafeAreaView>
  );
};

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
  button: {
    width: "75%",
    marginTop: 20,
  },
});

export default SignUp;
