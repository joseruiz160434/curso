import React, { useState, useEffect } from "react";
import * as firebase from "firebase"; //* es que traigo todo de firebase
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

export default function MyAccount() {
  //Login varibale que dice si esta logueado o no y setLogin la funcion que actualiza la variable login
  //useState la inicializo como null
  const [login, setLogin] = useState(null);

  useEffect(() => {
    //firebase.auth() para acceder al sistema de login de fireabase .onAuthStateChanged estado de autenticacion cambiado(como pa mirar el  estado de autenticacion)
    firebase.auth().onAuthStateChanged(user => {
      //si user es nulo (es el ?) o false (no esta loguado) o true logueado
      !user ? setLogin(false) : setLogin(true); //setLogin es la funcion de arriba
    });
  }, []);

  if (login === null) {
    //si esVisible es = a true muestra el texto de cargando para despues loguearse
    return <Loading isVisible={true} text="cargando..." />;
  }
  //si login tiene usuario esta logueado  y si no esta logueado o contenido userGuest
  return login ? <UserLogged /> : <UserGuest />;
}
