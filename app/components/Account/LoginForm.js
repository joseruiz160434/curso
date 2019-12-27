import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import { withNavigation } from "react-navigation";
import * as firebase from "firebase";
import Loading from "../Loading";

function LoginForm(props) {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //isVisibleLoading varible otra es funcion y  inicializa false no esta activo
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  //Hacemos destructuring para acceder al toast
  //hacemos destructuring para  aaceder a navigation
  const { toastRef, navigation } = props;
  const login = async () => {
    //cuando login se ejecute muestra el cargando y cuando termine lo cambia a false abajo
    setIsVisibleLoading(true);

    //si email o password es nulo o vacio
    if (!email || !password) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no es Correcto");
      } else {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            navigation.navigate("MyAccount");
          })
          .catch(() => {
            toastRef.current.show("Email o contraseña incorrecta");
          });
      }
    }
    //cuando termine cambia a false
    setIsVisibleLoading(false);
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electronico"
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Password"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={hidePassword}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community" //si hidepassword es true muestra el icono, si es false el otro icono
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)} //cuando haga click me vas a actualizar el estado y me va colocar lo contrario de lo que es ahora mismo
          />
        }
      />
      <Button //el boton tiene varios props diferentes para estilos
        title="Iniciar Sesión"
        containerStyle={styles.btnContainerLogin} //un porps para el contenedor
        buttonStyle={styles.btnLogin} // y otro props para el boton en si
        onPress={login}
      />
      <Loading isVisible={isVisibleLoading} text="Iniciando sesión" />
    </View>
  );
}
//para acceder a las propiedades y funciones de navigation necesitamos el withNavigation y envolvemos el componente
//en el withNavigation
export default withNavigation(LoginForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  iconRight: {
    color: "#c1c1c1"
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%"
  },
  btnLogin: {
    backgroundColor: "#00a680"
  }
});
