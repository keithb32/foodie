import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Text, Appbar, Card } from "react-native-paper";
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

const RestaurantInfo = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Appbar>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={route.params.restaurantName} />
      </Appbar>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Card style={styles.restaurantCard}>
          <Text style={styles.restaurantTitle} variant="displayMedium">
            {route.params.restaurantName}
          </Text>
          <Text variant="titleLarge" style={styles.header}>
            Menu
          </Text>
          <Text style={styles.body}>
            {route.params.website ? route.params.website : "Not available"}
          </Text>
          <Text variant="titleLarge" style={styles.header}>
            Location
          </Text>
          <Text style={styles.body}>
            {route.params.address ? route.params.address : "Not available"}
          </Text>
          <Text variant="titleLarge" style={styles.header}>
            Contact
          </Text>
          <Text style={styles.body}>
            {route.params.phone ? route.params.phone : "Not available"}
          </Text>
          <Text style={styles.credits}>Powered by TomTom's Search API</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestaurantInfo;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
  },
  scrollContentContainer: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    alignItems: "center",
  },
  restaurantCard: {
    width: "90%",
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    paddingBottom: 20,
  },
  restaurantTitle: {
    textAlign: "center",
  },
  header: {
    marginTop: 15,
  },
  body: {
    marginLeft: 20,
    fontSize: 16,
  },
  snackbarText: {
    color: "white",
  },
  credits:{
    textAlign: "center",
    marginTop: 30,
  },
});
