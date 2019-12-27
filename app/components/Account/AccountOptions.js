import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

//recibimos por props los datos desde UserLoggued
export default function AccountOptions(props) {
  //console.log(props); //comprobando que vengan los datos dl usuario

  //userInfo se lo pasamos a changeDisplayName para que aparesca el nombre cuando vaya a cambiar de nombre
  //setReloadData para que refresque los datos al hacer el cambio
  //toastRef para los mensajes viene desde userrlogued y va para changeDispalay
  const { userInfo, setReloadData, toastRef } = props;

  //para que el overlay si es visible o no. Con false no esta encendido
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  //creamos estado  que almacena nuestro componente de overlay inicialicamos nulo porque no tenemos ningun componente al pricipio
  //lo pasamos por el children el renderComponent
  const [renderComponent, setRenderComponent] = useState(null);

  //lista de opciones array de objetos que sera el menu y con map recorremos para renderizarlo
  const menuOptions = [
    {
      title: "Cambiar Nombre y Apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle", //para icono a la ezquierda
      iconColorLeft: "#ccc", //color para el icono de la izquierda
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName") //llamo la funcion
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("email")
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password")
    }
  ];

  //Funcion para cuando seleccione un items cambie el valor de setIsvisible y se muestre la modal
  const selectedComponent = key => {
    // console.log(key);
    switch (key) {
      case "displayName":
        //la funcion setRenderCOm del estado y le pasamos el componente a mostrar y el otro es para tue o flase si muestra o no
        //enviamos por props el nombre del usuario
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        //para que se muestre  el overlay
        setIsVisibleModal(true);
        console.log("estamos melos DisplayNamessss");
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        console.log("estamos melos email");
        break;
      case "password":
        setRenderComponent(
          <ChangePasswordForm
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        console.log("estamos melos pasword");
        break;
      default:
        break;
    }
    // setIsVisibleModal(true); //
  };

  return (
    <View>
      {/* tomamos el menu de opciones el map (devuelva cada opcion del menu, y el index de cada menu)*/}
      {menuOptions.map((
        menu,
        index //aqui colocamos paresntesis pa evitar colocar un return  que toca con{}
      ) => (
        <ListItem
          key={index} //Cada hacemos bucle necesitmos un key que es index
          title={menu.title} //para tomar el titulo de cada item
          leftIcon={{
            //para el icono de la izquierda
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight
          }}
          onPress={menu.onPress} //al hacer click en determinado item llame a la funcion
          containerStyle={styles.menuItem} //los estilos del menu
        />
      ))}

      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
    //si render component tiene contenido renderiza el modal
    // es una condicion mientras renderCOmponente no tenga ningun componente añadido  el modal no se va renderizar en ningun momento
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1, //
    borderBottomColor: "#e3e3e3"
  }
});
