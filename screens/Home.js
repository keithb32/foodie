import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { IconButton, Appbar, Menu, Searchbar } from "react-native-paper";
import RecipeList from "../components/RecipeList";
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

const Home = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Appbar>
        <Appbar.Content title="Recipes" />
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
        >
          <Menu.Item
            onPress={() => {
              logout();
            }}
            title="Logout"
          />
        </Menu>
      </Appbar>
      <Searchbar
        placeholder='Enter a recipe name or tag e.g.  "pizza", "lunch"'
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <RecipeList navigation={navigation} query={searchQuery} />
      <View style={styles.buttonContainer}>
        <IconButton
          icon="pen-plus"
          size={32}
          onPress={() => {
            console.log("Add recipe button pressed");
            navigation.navigate("Add Recipe");
          }}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  searchbar: {
    width: "90%",
    height: 40,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    marginRight: 10,
  },
  dialogInstructions: {
    marginBottom: 20,
  },
  recipeGroupContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default Home;
