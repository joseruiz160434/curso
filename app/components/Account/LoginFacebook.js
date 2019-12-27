import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import { FacebookApi } from "../../utils/Social";
import Loading from "../Loading";

export default function LoginFacebook(props) {
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const { toastRef, navigation } = props;

  const login = async () => {
    const {
      type,
      token
    } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.application_id,
      { permissions: FacebookApi.permissions }
    );
    if (type === "success") {
      setIsVisibleLoading(true);
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          navigation.navigate("MyAccount");
        })
        .catch(() => {
          toastRef.current.show(
            "Error accediendo con Facebook, intentarlo más tarde"
          );
        });
    } else if (type === "cancel") {
      toastRef.current.show("Inicio de sesión cancelado");
    } else {
      toastRef.current.show("Error desconocido, intentarlo más tarde");
    }
    setIsVisibleLoading(false);
  };
  return (
    <>
      <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading text="iniciando sesión" isVisible={isVisibleLoading} />
    </>
  );
}
