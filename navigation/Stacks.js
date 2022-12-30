import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import AddRecipe from "../screens/AddRecipe";
import RecipeInfo from "../screens/RecipeInfo";
import BottomTab from "./Tabs";
import DiscoverRecipes from "../screens/DiscoverRecipes";
import EditRecipe from "../screens/EditRecipe";
import FindRestaurants from "../screens/FindRestaurants";
import RestaurantInfo from "../screens/RestaurantInfo";
/***************************************************************************************
 *  REFERENCES
 *
 *  Title: react-navigation
 *  Author: satya164 et al.
 *  Date: 12/13/2022
 *  Code version: 6.3.9
 *  URL: https://github.com/react-navigation/react-navigation
 *  Software License: MIT License
 *
 *  Title: react-navigation/stack
 *  Author: satya 164 et al.
 *  Date: 12/12/2022
 *  Code version: 6.3.9
 *  URL: https://reactnavigation.org/docs/stack-navigator/
 *  Software License: MIT License
 *
 *  Title: Combining Stack, Tab & Drawer Navigations in React Native With React Navigation 5
 *  Author: Ekunola Ezekiel
 *  Date: 6/22/2020
 *  Code version: N/A
 *  URL: https://dev.to/easybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-da
 *  Software License: N/A
 *
 ***************************************************************************************/
const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: "Sign Up" }}
      />
    </Stack.Navigator>
  );
};

const RecipeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyRecipes"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Add Recipe" component={AddRecipe} />
      <Stack.Screen
        name="Recipe Info"
        component={RecipeInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edit Recipe" component={EditRecipe} />
    </Stack.Navigator>
  );
};

const DiscoverStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DiscoverRecipes"
        component={DiscoverRecipes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recipe Info"
        component={RecipeInfo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const RestaurantStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FindRestaurants"
        component={FindRestaurants}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Restaurant Info"
        component={RestaurantInfo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { LoginStack, RecipeStack, DiscoverStack, RestaurantStack };
