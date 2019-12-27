import React, { useRef } from "react"; //
import { View, Text, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "../../components/Account/RegisterForm";
import Toast from "react-native-easy-toast";

export default function Register() {
  const toastRef = useRef(); //toastRef va a tener  dentro el Toast donde lo referencie ref={toasref}

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewForm}>
        {/* le pasamos por props el toastRef a registerFORM */}
        <RegisterForm toastRef={toastRef} />
      </View>
      {/* El toast tiene como referencia al toastRef que parecera sera centrado y con una opacidad  */}
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  }
});
