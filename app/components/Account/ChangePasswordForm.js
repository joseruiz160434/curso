import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as firebase from "firebase";
import { Input, Button } from "react-native-elements";
import { reauthenticate } from "../../utils/Api";

export default function ChangePasswordForm(props) {
  //Aca no importamos el setReloadData porque es la contraseña lo que actulizamos y pues ya el usuario esta logueado
  const { setIsVisibleModal, toastRef } = props;

  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  const [error, setError] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  //para ocultar la contraseña o no
  const [hidePassword, setHidePassword] = useState(true);

  const [hideNewPassword, setHideNewPassword] = useState(true);

  const [hideNewPasswordRepeat, setHideNewPasswordRepeat] = useState(true);

  const updatePassword = () => {
    setError({}); //para limpiar los errores

    // si password es vacio o nulo y asu con los demas entra
    if (!password || !newPassword || !newPasswordRepeat) {
      let objError = {}; //inicializado como un objeto vacio
      !password && (objError.password = "No puede estar Vacio"); //si  password esta vacio, tomamos objError y en la propiedad password va a ser igual al texto
      !newPassword && (objError.newPassword = "No puede estar vacio"); // &&  esto es porque solo queremos un if
      !newPasswordRepeat &&
        (objError.newPasswordRepeat = "No puede estar vacio");
      setError(objError); //actualizamos setError con el objError
    } else {
      if (newPassword !== newPasswordRepeat) {
        //si son diferentes
        setError({
          newPassword: "Las nuevas contraseñas tienen que ser iguales",
          newPasswordRepeat: "Las nuevas contraseñas tienen que ser iguales"
        });
      } else {
        setIsLoading(true); //para que muestre el cargando
        reauthenticate(password) //reautenticar para luego poder cambiar la contraseña y le pasamos la contraseña actual
          .then(() => {
            firebase //conecta
              .auth()
              .currentUser.updatePassword(newPassword) //trae los datos del usuario actual y la funcion update de firebase le pasamos la nueva contraseña
              .then(() => {
                setIsLoading(false); //quitar el cargando
                toastRef.current.show("Contraseña actualizada correctamente.");
                setIsVisibleModal(false); //cierra la ventana
                firebase.auth().signOut(); //cierra la cuenta
              })
              .catch(() => {
                setError({ general: "Error al actuliazar la contraseña." });
                setIsLoading(false); //quita el cargando
              });
          })
          .catch(() => {
            //catch del primer then
            setError({ password: "La contraseña no es correcta." });
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Contraseña Actual"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hidePassword}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHidePassword(!hidePassword)
        }}
        errorMessage={error.password}
      />
      <Input
        placeholder="Contraseña Nueva"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hideNewPassword}
        onChange={e => setNewPassword(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hideNewPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHideNewPassword(!hideNewPassword)
        }}
        errorMessage={error.newPassword}
      />
      <Input
        placeholder="Repetir Contraseña Nueva"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hideNewPasswordRepeat}
        onChange={e => setNewPasswordRepeat(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hideNewPasswordRepeat ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHideNewPasswordRepeat(!hideNewPasswordRepeat)
        }}
        errorMessage={error.newPasswordRepeat}
      />
      <Button
        title="cambiar Contraseñe"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updatePassword}
        loading={isLoading}
      />
      <Text>{error.general}</Text>
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
