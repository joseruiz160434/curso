import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Dimensions
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function AddRestaurantForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  return (
    <ScrollView>
      <UploadImagen
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />
    </ScrollView>
  );
}

function UploadImagen(props) {
  const { imagesSelected, setImagesSelected } = props;

  return (
    <View style={styles.viewImages}>
      <Icon
        type="material-community"
        name="camera"
        color="#7a7a7a"
        containerStyle={styles.containerIcon}
        onPress={() => console.log()}
      />

      <Avatar
        //key={imageRestaurant}
        onPress={() => console.log("eliminando")}
        style={styles.miniatureStyle}
        //source={{ uri: imageRestaurant }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3"
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10
  }
});
