import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
} from "react-native";
import { Searchbar, List, Divider, Text } from "react-native-paper";
import Geolocation from "react-native-geolocation-service";
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
 *
 *  Title: react-native-geolocation-service
 *  Author: Agontuk et al.
 *  Date: 10/8/2022
 *  Code version: 5.3.1
 *  URL: https://github.com/Agontuk/react-native-geolocation-service
 *  Software License: MIT License
 *
 *  Title: React Native geolocation: A complete tutorial
 *  Author: Emmanuel Oaikhenan
 *  Date: 9/21/2022
 *  Code version: N/A
 *  URL: https://blog.logrocket.com/react-native-geolocation-complete-tutorial/
 *  Software License: N/A
 *
 ***************************************************************************************/

const FindRestaurants = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [location, setLocation] = useState();
  const [restaurants, setRestaurants] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getLocation();
  }, [submitting]);

  const fetchSearchResults = async (query) => {
    if (query && location) {
      console.log(query);
      console.log(location);
      const apiURL = `https://api.tomtom.com/search/2/categorySearch/${query}.json?lat=${location.coords.latitude}&lon=${location.coords.longitude}&radius=10000&view=Unified&relatedPois=all&key=${API_KEY}`;
      fetch(apiURL, { method: "GET" })
        .then((response) => response.json())
        .then((json) => {
          const restaurantList = json.results;
          setRestaurants([...restaurantList]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Function to get permission for location
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Geolocation Permission",
          message: "Can we access your location?",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === "granted") {
        console.log("You can use Geolocation");
        return true;
      } else {
        console.log("You cannot use Geolocation");
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  // function to check permissions and get Location
  const getLocation = async () => {
    const result = requestLocationPermission();
    result.then((res) => {
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation(position);
          },
          (error) => {
            console.log(error);
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    });
  };

  const ItemView = ({ item }) => {
    return (
      <List.Item
        title={
          item.poi.name +
          " (" +
          Math.round(item.dist * 0.000621371 * 100) / 100 +
          " mi. )"
        }
        onPress={() => {
          navigation.navigate("Restaurant Info", {
            restaurantName: item.poi.name,
            phone: item.poi.phone,
            website: item.poi.url,
            address: item.address.freeformAddress,
            tags: item.poi.categories,
          });
        }}
      />
    );
  };

  const ItemSeparatorView = () => {
    return <Divider />;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Searchbar
        placeholder='Enter a food or restaurant type e.g. "pizza", "cafe", "Mexican"'
        onChangeText={onChangeSearch}
        onSubmitEditing={(query) => {
          setSubmitting(!submitting);
          fetchSearchResults(searchQuery);
        }}
        value={searchQuery}
      />
      <View style={styles.listContainer}>
        {restaurants.length > 0 ? (
          <>
            <Text variant="headlineMedium" style={styles.listHeader}>
              Restaurants near you
            </Text>
            <FlatList
              data={restaurants}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
            />
          </>
        ) : (
          <Text variant="headlineMedium" style={styles.emptySearch}>
            {" "}
            No results found.{" "}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FindRestaurants;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  listHeader: {
    marginTop: 10,
    alignSelf: "center",
  },
  itemStyle: {
    padding: 15,
  },
  emptySearch: {
    alignSelf: "center",
  },
});
