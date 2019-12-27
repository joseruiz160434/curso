import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import AddRestaurant from "./AddRestaurant";
import * as firebase from "firebase";

export default function Restaurants(props) {
  //console.log(props);
  //este navigation se  lo vamos a pasar AddRestaurantButton
  const { navigation } = props;
  //estado del usuario  empieza nulo si tiene contenido es que esta logueado
  const [user, setUser] = useState(null);

  //
  useEffect(() => {
    //conetamos y onAuthStateChange si cambia el estado del usuario  si esta logueado o no
    //nos devuelve el userInfo va a ser una funcion => y setUser y pasamos userInfo
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={style.viewBody}>
      <Text>Estamos en Restaurants.</Text>
      {/* si user es diferente a null me devuelve AddRestaurantButton */}
      {user && <AddRestaurantButton navigation={navigation} />}
    </View>
  );
}

//recibe Props de Restaurants el de navegacion
function AddRestaurantButton(props) {
  const { navigation } = props;

  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => navigation.navigate("AddRestaurant")}
    />
  );
}

const style = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
