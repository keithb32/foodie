import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";
import { Searchbar, Divider, List, Text } from "react-native-paper";
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
 *  Title: React Native: Searching using Search Bar Filter in FlatList
 *  Author: Lirs Tech Tips
 *  Date: 12/13/2022
 *  Code version: N/A
 *  URL: https://www.youtube.com/watch?v=ToEd3ss4beA
 *  Software License: N/A
 *
 *  Title: JavaScript Fetch API
 *  Author: JavaScript Tutorial
 *  Date: N/A
 *  Code version: N/A
 *  URL: https://www.javascripttutorial.net/javascript-fetch-api/
 *  Software License: N/A
 ***************************************************************************************/

const DiscoverRecipes = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    return () => {};
  }, [recipes]);

  const fetchSearchResults = async (query) => {
    if (query) {
      const apiURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
      fetch(apiURL, { method: "GET" })
        .then((response) => response.json())
        .then((json) => {
          const recipeList = json.hits.map((hit) => hit.recipe);
          setRecipes([...recipeList]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const ItemView = ({ item }) => {
    return (
      <List.Item
        title={item.label}
        onPress={() =>
          navigation.navigate("Recipe Info", {
            recipeName: item.label,
            image: item.image,
            cookTime: item.totalTime,
            tags: [item.cuisineType, item.mealType, item.dishType].flat(),
            ingredients: item.ingredientLines,
            directions: item.url,
            fromAPI: true,
          })
        }
      />
    );
  };

  const ItemSeparatorView = () => {
    return <Divider />;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Searchbar
        placeholder='Enter a recipe name e.g. "pasta"'
        onChangeText={onChangeSearch}
        onSubmitEditing={() => {
          fetchSearchResults(searchQuery);
        }}
        value={searchQuery}
      />
      <View style={styles.listContainer}>
        {recipes.length > 0 || searchQuery === "" ? (
          <FlatList
            data={recipes}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        ) : (
          <Text style={styles.emptySearch}> No results were found. </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  itemStyle: {
    padding: 15,
  },
  emptySearch: {
    alignSelf: "center",
  },
});
export default DiscoverRecipes;
