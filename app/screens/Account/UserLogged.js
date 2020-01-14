import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/Account/AccountOptions";

export default function UserLogged() {
  //estado para guardar informacion del usuario y es igual a usetate y empieza como objeto vacio
  const [userInfo, setUserInfo] = useState({});

  //estado para que se actulice la varibale y poder actulizar el avatar de una
  //setReloadData se lo enviamos a AccountOption para que lo envie a changeName y refresque los datos
  const [reloadData, setReloadData] = useState(false);

  //texto dinamico
  const [textLoading, setTextLoading] = useState("");

  //para saber si esta cargando o no
  const [isLoading, setIsLoading] = useState(false);

  //para poder referenciar y utlizar el toasf donde lo referencie
  const toastRef = useRef();

  //para recoger la informacio usamos useEffect el useEfect se ejecuta despuesde montar el componente o cuando se actualiza algunaas de las varianbles dentro del []
  useEffect(() => {
    //funcion anonima asincrona
    (async () => {
      //espera a que se ejecute esto  conectamos a firebase .auth y currentUser es para el usuario logueado actualmente
      const user = await firebase.auth().currentUser;

      //llamamos la funcion del useState y le pasamos el user (usuaario) tomamos el obejto providerData y tomamos el elemento 0
      //como esta es la funcion de useState obtiene la info del usuario
      setUserInfo(user.providerData[0]);

      // console.log(user.providerData[0]);//del objeto que vota el user toma el providerData
      // console.log(user); //imprime un array con informacion del usuario
    })();
    setReloadData(false); //cuando entre aqui setreloaData puede estar en true cundo esta en true refreca el useEffect
    //y eso hace que nuestro userInfo cambie la informacion
  }, [reloadData]); //colocamos reloadData para cuando reloadData se actulice se ejecuta useEffect
  return (
    <View style={styles.viewUserInfo}>
      {/*envia la informacion del usuario al archivo infoUser por props */}
      {/* mandamos setReloadData para que infouser los reciba por props  */}
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef} //pasamos a infouser por props el toasf para wue lo utlice
        setIsLoading={setIsLoading} //se ejecuta la funcion para saber si se tiene que mostrar o no
        setTextLoading={setTextLoading} // y la funcion  del texto
      />
      {/*por props vamos a pasar AccountOption la informacion del usuario al hacer el props en account debe colocar el primer userInfo  */}
      {/*setReloadData para que actualice la info en la pantalla */}
      <AccountOptions
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
      {/* para cerrar sesion de firebase revisala authenticacion y cierra sesion */}
      {/*en el toasf referencio  y con pacidad */}
      <Button
        title="Cerrar Sesion"
        buttonStyle={styles.btnCloseSession} //estilos para el boton en general
        titleStyle={styles.btnCloseSessionText} //estilos solo para el texto dentro del boton
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      {/*el text es texloading y si es visible o no*/}
      <Loading text={textLoading} isVisible={isLoading} />
    </View>
  );
}

//TO DOparadespues entender bien este stylo
const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%", //se utiliza para definir la altura mínima de un elemento dado
    backgroundColor: "#f2f2f2"
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1, //para que tan ancho sea el borde arriba
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10
  },
  btnCloseSessionText: {
    color: "#00a680"
  }
});
