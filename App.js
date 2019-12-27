import React from "react";
import Navigation from "./app/navigations/Navigation"; //importamos el archivo que tiene la navegacion
import { firebaseApp } from "./app/utils/FireBase"; //traerlo para inicializarlo en nuestro proyecto firebaseApp porque a eso le asigne la inicializacion de firebase

export default function App() {
  return <Navigation />;
}
