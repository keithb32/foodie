import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../contexts/AuthProvider";
import RecipeListItem from "./RecipeListItem";
/***************************************************************************************
 *  REFERENCES
 *
 *  Title: react-native-firebase
 *  Author: Salakar (Mike Diarmid) et al.
 *  Date: 12/7/2022
 *  Code version: 16.4.6
 *  URL: https://github.com/invertase/react-native-firebase
 *  Software License: Apache-2.0 License
 ***************************************************************************************/

const RecipeList = (props) => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .doc(user.uid)
      .collection("recipes")
      .onSnapshot((querySnapshot) => {
        let recipeList = [];

        querySnapshot.forEach((documentSnapshot) => {
          recipeList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        if (props.query) {
          recipeList = recipeList.filter(
            (recipe) =>
              recipe.name.toLowerCase().indexOf(props.query.toLowerCase()) >
                -1 ||
              recipe.tags.toString().indexOf(props.query.toLowerCase()) > -1
          );
        }

        setRecipes(recipeList);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [props.query, user.uid]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={recipes}
      renderItem={({ item }) => (
        <RecipeListItem
          recipe={item}
          key={item}
          navigation={props.navigation}
        />
      )}
    />
  );
};

export default RecipeList;
