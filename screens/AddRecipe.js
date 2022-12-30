import React, { useEffect, useState, useContext } from "react";
import { Button, SegmentedButtons } from "react-native-paper";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Text, TextInput, List, Chip } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
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
 *
 *  Title: react-native-image-picker
 *  Author: marcshilling et al.
 *  Date:  12/1/2022
 *  Code version: 4.10.2
 *  URL: https://github.com/react-native-image-picker/react-native-image-picker
 *  Software License: MIT License
 *
 *  Title: React Native Image Upload, Retrieve & Delete From Firebase Cloud Storage (iOS & Android)
 *  Author: Sultan Butt
 *  Date: 4/30/2020
 *  Code version: N/A
 *  URL: https://medium.com/@sultanbutt820/react-native-image-upload-retrieve-delete-from-firebase-cloud-storage-ios-android-e05c7cdbf1d2
 *  Software License: N/A
 *
 *  Title: How to pick images from Camera & Gallery in React Native app
 *  Author: Aditya Sharma
 *  Date: N/A
 *  Code version: N/A
 *  URL: https://enappd.com/blog/pick-images-from-camera-gallery-in-react-native-app/78/
 *  Software License: N/A
 *
 *  Title: Firebase get Download URL after successful image upload to firebase storage
 *  Author: Brian Revie
 *  Date: 8/16/17
 *  Code version: N/A
 *  URL: https://stackoverflow.com/questions/45714007/firebase-get-download-url-after-successful-image-upload-to-firebase-storage
 *  Software License: N/A
 ***************************************************************************************/

const AddRecipe = ({ navigation }) => {
  const [formView, setFormView] = useState("overview");

  const [recipeName, setRecipeName] = useState("");
  const [showDummyImage, setShowDummyImage] = useState(true);
  const [image, setImage] = useState("");

  const [cookTime, setCookTime] = useState("");
  const [curIngredient, setCurIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState("");

  const [curTag, setCurTag] = useState("");
  const [recipeTags, setRecipeTags] = useState([]);

  const { user } = useContext(AuthContext);

  const openCamera = () => {
    let options = {
      saveToPhotos: false,
      mediaType: "photo",
      includeBase64: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button ", response.customButton);
      } else {
        console.log("response", JSON.stringify(response));
        setImage(response.assets[0].uri);
        setShowDummyImage(false);
      }
    });
  };

  const openImageLibrary = () => {
    let options = {
      selectionLimit: 0,
      mediaType: "photo",
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        console.log("response", JSON.stringify(response));
        setImage(response.assets[0].uri);
        setShowDummyImage(false);
      }
    });
  };

  const renderImage = () => {
    if (showDummyImage) {
      return (
        <Image
          source={require("../assets/placeholder_img.png")}
          style={styles.image}
        />
      );
    } else {
      return <Image source={{ uri: image }} style={styles.image} />;
    }
  };

  const addIngredient = () => {
    if (curIngredient !== "") {
      const newIngredients = [...ingredients, curIngredient];
      setIngredients(newIngredients);
      setCurIngredient("");
    }
  };

  const removeIngredient = (index) => {
    const filteredIngredients = ingredients.filter((recipe, i) => i !== index);
    setIngredients(filteredIngredients);
  };

  const addTag = () => {
    if (curTag !== "") {
      const newTags = [...recipeTags, curTag.toLowerCase()];
      setRecipeTags(newTags);
      setCurTag("");
    }
  };

  const removeTag = (index) => {
    const filteredTags = recipeTags.filter((tag, i) => i !== index);
    setRecipeTags(filteredTags);
  };

  const saveRecipe = async () => {
    if (recipeName === "") {
      Alert.alert(
        "Error: Incomplete form data",
        "Please provide a recipe name before saving your recipe."
      );
    } else if (!image) {
      firestore()
        .collection("users")
        .doc(user.uid)
        .collection("recipes")
        .add({
          name: recipeName,
          image: "",
          cookTime: cookTime,
          ingredients: ingredients,
          directions: directions,
          tags: recipeTags,
        })
        .then(() => {
          console.log("Recipe added to firebase!");
          navigation.navigate("MyRecipes");
        });
    } else {
      const storageRef = storage().ref(recipeName);
      const task = storageRef.putFile(image);
      task.then((event) => {
        storageRef
          .getDownloadURL()
          .then((url) => {
            firestore()
              .collection("users")
              .doc(user.uid)
              .collection("recipes")
              .add({
                name: recipeName,
                image: url,
                cookTime: cookTime,
                ingredients: ingredients,
                directions: directions,
                tags: recipeTags,
              })
              .then(() => {
                navigation.navigate("MyRecipes");
              });
          })
          .catch((e) => console.log("uploading image error => ", e));
      });
    }
  };

  useEffect(() => {}, [formView, ingredients, recipeTags]);

  if (formView === "recipe") {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView>
          <SegmentedButtons
            value={formView}
            onValueChange={setFormView}
            buttons={[
              {
                value: "overview",
                label: "Overview",
              },
              {
                value: "recipe",
                label: "Recipe",
              },
              {
                value: "tags",
                label: "Tags",
              },
            ]}
            style={styles.segButtons}
          />
          <View style={styles.inputContainer}>
            <TextInput
              label="Cook Time (minutes)"
              mode="outlined"
              value={cookTime}
              onChangeText={(cookTime) => setCookTime(cookTime)}
              style={styles.input}
            />
            <TextInput
              label="Ingredients"
              mode="outlined"
              placeholder='e.g. "1 tbsp sugar"'
              value={curIngredient}
              right={
                <TextInput.Icon
                  icon="plus"
                  onPress={() => {
                    addIngredient();
                  }}
                  forceTextInputFocus={true}
                />
              }
              onChangeText={(curIngredient) => setCurIngredient(curIngredient)}
              style={styles.input}
            />
            <List.Section style={{ marginBottom: 10, }}>
              {ingredients.map((ingredient, index) => (
                <Chip
                  key={index}
                  style={{ height: 50 }}
                  compact
                  onClose={() => {
                    removeIngredient(index);
                  }}
                >
                  {ingredient}
                </Chip>
              ))}
            </List.Section>
            <TextInput
              label="Directions"
              mode="outlined"
              value={directions}
              multiline={true}
              onChangeText={(directions) => setDirections(directions)}
              style={styles.input}
            />
          </View>
        </ScrollView>
        <View style={styles.saveButtonContainer}>
          <Button
            mode="contained"
            style={styles.saveButton}
            onPress={() => {
              saveRecipe();
            }}
          >
            Save
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (formView === "tags") {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView contentContainerStyle={styles.inputContainer}>
          <SegmentedButtons
            value={formView}
            onValueChange={setFormView}
            buttons={[
              {
                value: "overview",
                label: "Overview",
              },
              {
                value: "recipe",
                label: "Recipe",
              },
              {
                value: "tags",
                label: "Tags",
              },
            ]}
            style={styles.segButtons}
          />
          <Text style={styles.tagInstructions}>
            Enter keywords to help optimize searches through your recipe list
            e.g. "breakfast", "sweet", "savory".
          </Text>
          <TextInput
            label="Tags"
            mode="outlined"
            placeholder='e.g. "breakfast"'
            value={curTag}
            style={styles.input}
            right={
              <TextInput.Icon
                icon="plus"
                onPress={() => {
                  addTag();
                }}
                forceTextInputFocus={true}
              />
            }
            onChangeText={(curTag) => setCurTag(curTag)}
          />
          <List.Section style={{ marginBottom: 10 }}>
            {recipeTags.map((tag, index) => (
              <Chip
                key={index}
                style={{ height: 50 }}
                compact
                onClose={() => {
                  removeTag(index);
                }}
              >
                {tag}
              </Chip>
            ))}
          </List.Section>
        </ScrollView>
        <View style={styles.saveButtonContainer}>
          <Button
            mode="contained"
            style={styles.saveButton}
            onPress={() => {
              saveRecipe();
            }}
          >
            Save
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <SegmentedButtons
        value={formView}
        onValueChange={setFormView}
        buttons={[
          {
            value: "overview",
            label: "Overview",
          },
          {
            value: "recipe",
            label: "Recipe",
          },
          {
            value: "tags",
            label: "Tags",
          },
        ]}
        style={styles.segButtons}
      />
      <View style={styles.inputContainer}>
        <Text variant="titleMedium" style={styles.inputLabel}>
          Recipe Name (required)
        </Text>
        <TextInput
          label="Recipe Name"
          mode="outlined"
          value={recipeName}
          onChangeText={(recipeName) => setRecipeName(recipeName)}
          style={styles.input}
        />
        <Text variant="titleMedium" style={styles.inputLabel}>
          Recipe Image
        </Text>
        {renderImage()}
        <Button
          icon="camera"
          mode="contained-tonal"
          contentStyle={{ flexDirection: "row-reverse" }}
          onPress={() => openCamera()}
          style={styles.cameraButton}
        >
          Take photo
        </Button>
        <Button
          icon="image"
          mode="contained-tonal"
          contentStyle={{ flexDirection: "row-reverse" }}
          onPress={() => openImageLibrary()}
          style={styles.cameraButton}
        >
          Choose photo
        </Button>
      </View>
      <View style={styles.saveButtonContainer}>
        <Button
          mode="contained"
          style={styles.saveButton}
          onPress={() => {
            saveRecipe();
          }}
        >
          Save
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    flexDirection: "column",
  },
  segButtons: {
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 10,
  },
  inputContainer: {
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },
  cameraButton: {
    marginBottom: 10,
  },
  input: {
    width: "75%",
    marginBottom: 15,
  },
  tagInstructions: {
    marginLeft: 10,
    marginBottom: 10,
  },
  saveButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignSelf: "center",
    marginBottom: 20,
    padding: 10,
  },
  saveButton: {
    width: 150,
  },
});

export default AddRecipe;
