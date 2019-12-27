import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation"; //vamos a envolver nuestro componente en withNavigation   para poder extraer el navigation.navigate

function UserGuest(props) {
  //hace destructuring navigation es una funcion de navegacion que traje al encapsular withNavigation
  const { navigation } = props;

  return (
    //centerContent es una propiedad Cuando es verdadero, la vista de desplazamiento
    //centra automáticamente el contenido cuando el contenido es más pequeño que los
    //límites de la vista de desplazamiento; cuando el contenido es más grande que la
    //vista de desplazamiento, esta propiedad no tiene efecto. El valor predeterminado es falso
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/img/user-guest.jpg")}
        style={styles.image}
        resizeMode="contain" // para que ocupe todo el contenedor
      />
      <Text style={styles.title}>Consulta tu perfil de 5 Tenedores</Text>
      <Text style={styles.description}>
        ¿Como describirias tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado más y
        comenta como ha sido tu experiencia.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          // buttonstyle son propiedades porque si agrego otro nombre cambian cosas
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Ver tu Perfil"
          onPress={() => navigation.navigate("Login")} //añadimos la funcion que hemos importado navigation y navigate y entre parentesis a que pagina queremos ir
        />
      </View>
    </ScrollView>
  );
}

//aca parece que envuelve el withnavigation al componente userguest
export default withNavigation(UserGuest);

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40 //es para el espacio entre obejto y parte baja
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center" //centrar texto
  },
  description: {
    textAlign: "center", //para centrar
    marginBottom: 20
  },
  viewBtn: {
    flex: 1,
    alignItems: "center" //centrar un objeto
  },
  btnStyle: {
    backgroundColor: "#00a680",
    marginBottom: 20
  },
  btnContainer: {
    width: "70%"
  }
});
