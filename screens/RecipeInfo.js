import React, { useContext, useState } from "react";
import { SafeAreaView, ScrollView, Image, StyleSheet } from "react-native";
import {
  Text,
  Appbar,
  Button,
  Card,
  Snackbar,
  Portal,
  Dialog,
  Paragraph,
} from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
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
 *
 *  Title: react-native-firebase
 *  Author: Salakar (Mike Diarmid) et al.
 *  Date: 12/7/2022
 *  Code version: 16.4.6
 *  URL: https://github.com/invertase/react-native-firebase
 *  Software License: Apache-2.0 License
 ***************************************************************************************/

const RecipeInfo = ({ navigation, route }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const showDialog = () => {
    setDialogVisible(true);
  };
  const hideDialog = () => setDialogVisible(false);

  const { user } = useContext(AuthContext);

  const deleteRecipe = () => {
    firestore()
      .collection("users")
      .doc(user.uid)
      .collection("recipes")
      .doc(route.params.recipeID)
      .delete()
      .then(() => {
        hideDialog();
        navigation.goBack();
      });
  };

  const saveRecipe = () => {
    firestore()
      .collection("users")
      .doc(user.uid)
      .collection("recipes")
      .add({
        name: route.params.recipeName,
        image: route.params.image,
        cookTime: route.params.cookTime,
        ingredients: route.params.ingredients,
        directions: route.params.directions,
        tags: route.params.tags,
      })
      .then(() => {
        onToggleSnackBar();
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Appbar>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={route.params.recipeName} />
        {route.params.fromAPI ? (
          <Appbar.Action icon="content-save" onPress={saveRecipe} />
        ) : (
          <>
            <Appbar.Action
              icon="pencil"
              onPress={() => {
                navigation.navigate("Edit Recipe", {
                  name: route.params.recipeName,
                  recipeID: route.params.recipeID,
                  image: route.params.image,
                  cookTime: route.params.cookTime,
                  ingredients: route.params.ingredients,
                  directions: route.params.directions,
                  tags: route.params.tags,
                });
              }}
            />
            <Appbar.Action icon="delete" onPress={showDialog} />
          </>
        )}
      </Appbar>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.recipeInfo}>
          <Text style={styles.recipeTitle} variant="displayMedium">
            {route.params.recipeName}
          </Text>
          {route.params.image && (
            <Image
              source={{ uri: route.params.image, width: 300, height: 300 }}
              style={styles.image}
            />
          )}
          <Text variant="titleLarge" style={styles.recipeHeader}>
            Overview
          </Text>
          <Text style={styles.recipeText}>
            {`\u2022`} Cook time (min):{" "}
            {route.params.cookTime ? route.params.cookTime : "N/A"}
          </Text>
          <Text style={styles.recipeText}>
            {`\u2022`} Tags:{" "}
            {route.params.tags.length > 0
              ? route.params.tags.join(", ")
              : "N/A"}
          </Text>
          <Text variant="titleLarge" style={styles.recipeHeader}>
            Ingredients
          </Text>
          {route.params.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.recipeText}>
              {`\u2022`} {ingredient}
            </Text>
          ))}
          <Text variant="titleLarge" style={styles.recipeHeader}>
            Directions
          </Text>
          <Text style={styles.recipeText}>{route.params.directions}</Text>
          {route.params.fromAPI && (
            <Image
              source={require("../assets/edamam-badge.png")}
              style={styles.credits}
            />
          )}
        </Card>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={() => {
          onDismissSnackBar();
        }}
        action={{
          label: "Go to Home screen",
          onPress: () => {
            navigation.navigate("Home");
          },
        }}
      >
        <Text style={styles.snackbarText}>Saved in recipe list</Text>
      </Snackbar>
      {!route.params.fromAPI && (
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={hideDialog}>
            <Dialog.Title>Warning</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={styles.dialogInstructions}>
                You are about to delete your saved recipe. Do you wish to
                continue?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={deleteRecipe}>Confirm</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </SafeAreaView>
  );
};

export default RecipeInfo;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
  },
  scrollContent: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  recipeInfo: {
    width: "90%",
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    padding: 30,
    paddingBottom: 20,
  },
  recipeTitle: {
    textAlign: "center",
  },
  recipeHeader: {
    marginTop: 15,
  },
  recipeText: {
    marginLeft: 20,
    fontSize: 16,
  },
  snackbarText: {
    color: "white",
  },
  credits: {
    width: 300,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 20,
  },
});
