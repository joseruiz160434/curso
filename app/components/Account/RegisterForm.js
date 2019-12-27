import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation"; //importamos un script para validar el email
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import Loading from "../Loading";

function RegisterForm(props) {
  // console.log(props); //imprime el objeto de toast traido desde register

  //Hacemos Destructuring a la variable  que Hicimos en Register y que ahora tiene el Toas
  //toastRef y es igual a props
  //traemos de los props el navigation tambien
  const { toastRef, navigation } = props;

  //creamos un estado que nos dice si la contraseña esta visible o no
  const [hidePassword, setHidePassword] = useState(true); //la varible va ser true o sea oculta y la otra es funcion
  const [hideRepeatPassword, setHideRepeatPassword] = useState(true);

  //para cambiar el estado para saber cuando muestra el cargando
  //
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  //guardamos los valores  en el estado para enviar y validar se puede hacer  un estado dinamico con todos los campos
  //aca creamos un estado para cada campo pero hay otras formas
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  //funcion asincrona para que no haga nada o se registre o de error
  const register = async () => {
    //muestra el loading
    setIsVisibleLoading(true);
    //si alguno de esos campos esta vacio
    if (!email || !password || !repeatPassword) {
      //para aparecer un mensajeito la variable que le hicimos destructurin (toastRef) y que ahora tiene el toast
      // y current es como una propiedad del objeto del current
      //toastRef.current.show("obligatorios", 5000); para que dure 5 segundo, DURATION,FOREVER o llmar una funcion hacer una  funcion
      toastRef.current.show("Todos los campos son obligatorios ");
    } else {
      if (!validateEmail(email)) {
        // si es false entra email incorrecto
        toastRef.current.show("Por Favor Escribir un Email Valido", 5000);
      } else {
        if (password !== repeatPassword) {
          toastRef.current.show("Las contraseñas no son Iguales ");
        } else {
          await firebase //await espere a que firebase auten
            .auth() //es como la funcion de autenticacion el .trim() es un método se utiliza para eliminar espacios en blanco
            .createUserWithEmailAndPassword(email.trim(), password) //createUserWithEmailAndPassword es una funcion ya preestablecida por firebase y los parametros a registrar
            .then(() => {
              navigation.navigate("MyAccount");
            })
            .catch(() => {
              toastRef.current.show(
                "Error al crear la cuenta, intentelo más tarde"
              );
            });
        }
      }
    }

    //para ejecutar la funcion que va a cambiar el estado y poder mostrar el cargando
    //la colococamos aqui porque es una funcion asincrona o sea que aqui no llega hasta que lo de catch o then se complete
    //false lo oculta
    setIsVisibleLoading(false);

    // console.log("usuario registrado");
    // console.log("email:" + email);
    // console.log("password" + password);
    // console.log("Repeat Password" + repeatPassword);

    // const resultEmailValidation = validateEmail(email);
    // console.log("FHD" + resultEmailValidation);
  };

  return (
    <View style={styles.formContainer} behavior="padding" enabled>
      <Input
        placeholder="Correo Electronico"
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)} //setEmail que es la funcion que actuliza varibale email e.nativeEvent.text para capturar el valor
        rightIcon={
          //propiedad para agregar un icono dentro del input
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña minimo 6 caracteres"
        password={true}
        secureTextEntry={hidePassword} //aca va hidenPassword para cambiar el valor de true a false
        containerStyle={styles.inputForm}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)} //si presiona se ejecuta la funcion setHidePassword  que hace lo contrario si es true lo coloca a false
          />
        }
      />
      <Input
        placeholder="Repetir Contraseña"
        password={true}
        secureTextEntry={hideRepeatPassword} //secureTextEntry propiedad para pcultar la constraseña si coloca true  y false la muestra
        containerStyle={styles.inputForm}
        onChange={e => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />
      <Loading //recibe dos props que son el texto y si es visible o no
        text="Creando Cuenta"
        isVisible={isVisibleLoading} //isVisibleLoading varible que cree arriba para mostrar o no el cargando
      />
    </View>
  );
}

//de esta manera estamos envolviendo el componente RegisterForm con el withNavigation
// y ya debe recibir el componente RegisterForm todas las propiedades de navegacion
export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  iconRight: {
    color: "#c1c1c1"
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%"
  },
  btnRegister: {
    backgroundColor: "#00a680"
  }
});
