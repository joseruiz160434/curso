import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { withNavigation } from "react-navigation"; //aca no lo usamos porque el create account lo trajo por medio de props
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast"; //el toast necesita de useRef para funcionar
import LoginFacebook from "../../components/Account/LoginFacebook";

//necesitamos usar la  funcion de navigate y para ello viene por los props que nos proporciona react-navigation
export default function Login(props) {
  //usamos destructuring  pa poder sacar contenido de la funcion navigation
  const { navigation } = props;
  //console.log(navigation); //no entiendo porque aca no hicimos lo de withNavigation que encapsula todo el componente

  //el toastRef como referencia abajo va tomar todas las propiedades de Toast
  //y despues lo paso por el para el LoginForm
  const toastRef = useRef();

  //llamo al componente interno CreateAccount que esta abajo <CreateAccount /> como funcion
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount navigation={navigation} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.viewContainer}>
        <LoginFacebook />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </ScrollView>
  );
}

// arriba <CreateAccount navigation={navigation} /> por eso CreateAccount(props) recibe props que es para poder navegar
//recibe props porque pa poder redireccionar de una pagina a otra necesitamos hacer uso del navigation
//esto es un componente
function CreateAccount(props) {
  const { navigation } = props;

  console.log("estamos en createaccount");
  return (
    <Text style={styles.textRegister}>
      ¿Aun no Tienes Una Cuenta?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("Register")}
      >
        Registrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold" //para decir sie el rexto es negrita cursiva etc
  },

  divider: {
    backgroundColor: "#00a680",
    margin: 40
  }
});
