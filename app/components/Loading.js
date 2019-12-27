import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native"; // el ActivityIndicator es un spinner
import { Overlay } from "react-native-elements"; //overlay para mostar una pantalla en la mitad de la pantalla con el spinner

export default function Loading(props) {
  //isVisible para saber si el loading es visible o no y el texto
  const { isVisible, text } = props;

  return (
    //estilos de la pantalla cargando en la mitad
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0, 0, 0, .5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      {/* la vista que va dentro del overlay */}
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#00a680" />
        {/* si la variable text llega llena  renderiza el texto el valor que llegue por text en los props */}
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#00a680",
    borderWidth: 2,
    borderRadius: 10
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  text: {
    color: "#00a680",
    textTransform: "uppercase",
    marginTop: 10
  }
});
