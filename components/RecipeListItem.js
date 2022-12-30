import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
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
const RecipeListItem = (props) => {
  return (
    <Card
      style={styles.card}
      onPress={() =>
        props.navigation.navigate("Recipe Info", {
          recipeName: props.recipe.name,
          recipeID: props.recipe.key,
          image: props.recipe.image,
          cookTime: props.recipe.cookTime,
          tags: props.recipe.tags,
          ingredients: props.recipe.ingredients,
          directions: props.recipe.directions,
          fromAPI: false,
        })
      }
    >
      <Card.Content>
        <Title>{props.recipe.name}</Title>
        <Paragraph>
          Cook time (min):{" "}
          {props.recipe.cookTime ? props.recipe.cookTime : "N/A"}
        </Paragraph>
        <Paragraph>
          Tags:{" "}
          {props.recipe.tags.length > 0 ? props.recipe.tags.join(", ") : "N/A"}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export default RecipeListItem;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    padding: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
});
