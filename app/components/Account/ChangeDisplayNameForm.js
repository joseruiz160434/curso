//TO DO NO SE PORQUE ACTULIZA PERO ME MUESTRA EL MENSJAE DE QUE NO SE PUDO
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayNameForm(props) {
  //displayName para traer el nombre y setIsVisibleModal porque cuando le damos en enviar queremos que el estado
  // al modal y lo hacemos con esta funcion que llega de accountOption
  //setReloadData para que recupere la info del usuario sin tener que refescar la app
  //ToasRef que llega de usserLoggued
  const { displayName, setIsVisibleModal, setReloadData, toasRef } = props;

  //newDisplayName donde vamos a guardar el nuevo nombre y su funcion  y es null empezando
  const [newDisplayName, setNewDisplayName] = useState(null);
  //error donde vamos a guardar el error y su funcion
  const [error, setError] = useState(null);
  //para mostrar el cargando
  const [isLoading, setIsLoading] = useState(false);

  //console.log(props);
  const updateDisplayName = () => {
    setError(null); //para limpiar para que cada vez que mandemos el form el estado de errores se limpie
    if (!newDisplayName) {
      //si newDisplayName es nulo o esta vacio
      setError("El nombre del usuario no ha cambiado");
    } else {
      setIsLoading(true); //si entra aca es porque es correcto y se mostrara el cargando
      const update = {
        //donde vamos a guardar los valores que se van a actulizar
        displayName: newDisplayName
      };
      firebase //conectamos
        .auth()
        .currentUser.updateProfile(update) //currenuser y update son funciones de firebase y pasamos la constante nuevonombe
        .then(() => {
          setIsLoading(false); //paramos el loading porque ya ha acabado de cargar
          setReloadData(true); //para actulizar la infor del usuario en pantalla
          toasRef.current.show("Nombre Actulizado Correctamente.", 10000);
          setIsVisibleModal(false); //quitamos la ventana modal
        })
        .catch(() => {
          setError(
            `Error al Actulizar el nombre de ${displayName} a ${newDisplayName}`
          );
          setIsLoading(false); //para que no cargue
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        defaultValue={displayName && displayName} //si displayName existe me lo coloca si no no coloca nada
        //por cada cambio en el input se va a ctualizar el newDisplayName
        onChange={e => setNewDisplayName(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2"
        }}
        errorMessage={error} //va a mostrar el estado del error
      />
      <Button
        title="Cambiar Nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayName}
        loading={isLoading} //esta de cargando
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "#00a680"
  }
});
