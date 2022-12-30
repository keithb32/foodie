import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../screens/Home";
import { DiscoverStack, RestaurantStack } from "./Stacks";
/***************************************************************************************
 *  REFERENCES
 *
 *  Title: react-navigation/material-bottom-tabs
 *  Author: satya 164 et al.
 *  Date: 12/12/2022
 *  Code version: 6.2.9
 *  URL: https://reactnavigation.org/docs/bottom-tab-navigator/
 *  Software License: MIT License
 *
 *  Title: react-navigation
 *  Author: satya164 et al.
 *  Date: 12/13/2022
 *  Code version: 6.3.9
 *  URL: https://github.com/react-navigation/react-navigation
 *  Software License: MIT License
 *
 *  Title: react-native-vector-icons
 *  Author: oblador (Joel Arvidsson)
 *  Date: 12/14/2022
 *  Code version: 9.2.0
 *  URL: https://github.com/oblador/react-native-vector-icons
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

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover Recipes"
        component={DiscoverStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book-search"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Find Restaurants"
        component={RestaurantStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="store-search"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
