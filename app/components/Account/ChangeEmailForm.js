import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { reauthenticate } from "../../utils/Api";

export default function ChangeEmailForm(props) {
  //email obtener email,setIsvisibleModal pa poder errar el modal cuando terminemos ejecucion
  //setReloadData para actulizar la informacion del usuario en la app  y el toasf mostrar mensa
  const { email, setIsVisibleModal, setReloadData, toastRef } = props;
  //para guardar el nuevo Email
  const [newEmail, setNewEmail] = useState("");
  //estado para la contraseña
  const [password, setPassword] = useState("");
  //const de error inicilizamos como un objeto añadimos varios errores
  const [error, setError] = useState({});
  //para mostrar o no la contraseña inicializa true oculta
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const updateEmail = () => {
    setError({}); //par aque cuando den click el objeto este vacio de errores
    if (!newEmail || email === newEmail) {
      // si !newEmail es nulo o email === newEmail
      setError({ email: "El email no puede ser igual o estar vacio." });
    } else {
      setIsLoading(true); //muestra el cargando
      reauthenticate(password) //hacemos el proceso  de autenticacion y el parametro es la contraseña
        .then(() => {
          firebase //conectamos
            .auth()
            .currentUser.updateEmail(newEmail) //currentUser usuario actual updateEmail funcion de firebase y le pasa el nuevoemail
            .then(() => {
              setIsLoading(false); //quita el cargando
              setReloadData(true); //para actulizar datos en la pantall
              toastRef.current.show("Email actualizado correctamente");
              setIsVisibleModal(false); //quita el modal
            })
            .catch(() => {
              setError({ email: "Error al actualizar el email." });
              setIsLoading(false); //quita el cargando
            });
        })
        .catch(() => {
          setError({ password: "La contraseña no es correcta." });
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        defaultValue={email && email} //el valor por default es el correo email validamos si email existe coloque email
        //para que se vaya actulizando el newEmail
        onChange={e => setNewEmail(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2"
        }}
        errorMessage={error.email} //llama la varible error y le añdimos el email que es la referencia que le añado all mensaje antes de este
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true} //
        secureTextEntry={hidePassword} //para ocultar la contraseña y estado para mostrar la contra
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "eye-outline" : "eye-off-outline", //si hidePassword es true coloca  otline y si no off-
          color: "#c2c2c2",
          onPress: () => setHidePassword(!hidePassword) //al presionar el icono que cambie el hidepassword
        }}
        errorMessage={error.password} //mostrar los menssajes de password
      />
      <Button
        title="Cambiar Correo Electronico"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateEmail} //Al presioanr el boton se ejecute la funcion
        loading={isLoading} //para mmostrar el cargando
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
