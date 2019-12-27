import React from "react";
import { StyleSheet } from "react-native";
import { Overlay } from "react-native-elements"; //VENTANA MODAL

//por props nos llega si es visible o no
export default function Modal(props) {
  //si es visible o no y la funcion y el children que es lo que llega por props
  const { isVisible, setIsVisible, children } = props;

  //   const closeModal = () => {
  //      setIsVisible(false);
  //   }

  const closeModal = () => setIsVisible(false);

  //renderizamos el children dentro del overlay
  return (
    <Overlay
      isVisible={isVisible} //Si el modal es visible o no
      windowBackgroundColor="rgba(0,0,0, .5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal} //cuando se presione fuera del overlay se cierre llama a la funcion closeModal
    >
      {children}
    </Overlay>
  );
  {
    /*dentro del overlay se va a renderizar lo que le llegue al overlay por medio del children el children viene por los props */
  }
}

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff"
  }
});
