//esta es la parte de abajo de la navegacion es estatica
import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation"; //traemos createAPPcontainer para crearel contenedor de la navegacion
import { createBottomTabNavigator } from "react-navigation-tabs"; //traemos el createBottomTabNavigator

import RestaurantsScreenStacks from "./RestaurantsStacks"; //aca importamos la variable que tiene el stack de navegacion de restaurantsStacks
import TopListScreenStacks from "./TopListsStacks";
import SearchScreenStacks from "./SearchStacks";
import AccountScreenStacks from "./AccountStacks";

//crear nuestra nevegacion y creamos variable donde guardamos nuestros stack( rutas de navegacion)
const NavigationStacks = createBottomTabNavigator(
  {
    //createBottomTabNavigator es como una funcion ya preestablecida de la libreria para crear boton de navegacion

    Restaurants: {
      screen: RestaurantsScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Restaurantes5", // es el texto debajo del icono en la parte de abajo
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="compass-outline"
            size={22}
            color={tintColor}
          />
        )
      })
    },

    TopLists: {
      screen: TopListScreenStacks, // es la variable que le asigno el createStackNavigator
      navigationOptions: () => ({
        tabBarLabel: "Ranking",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="star-outline"
            size={22}
            color={tintColor}
          />
        )
      })
    },

    SearchCualquiera: {
      screen: SearchScreenStacks, // es la variable que le asigno el createStackNavigator
      navigationOptions: () => ({
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="magnify"
            size={22}
            color={tintColor}
          />
        )
      })
    },

    Account: {
      screen: AccountScreenStacks, // es la variable que le asigno el createStackNavigator
      navigationOptions: () => ({
        tabBarLabel: "Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="home-outline"
            size={22}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Restaurants", //para que al iniciar la aplicacion se abra en  esa ruta ejemplo SearchCualquiera se toma es el que nombro arriba
    order: ["Restaurants", "TopLists", "SearchCualquiera", "Account"], //para establecer el orden de los botones
    tabBarOptions: {
      //cuando esta activo el boton de navegacion se coloca verde y los demas gris
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);

//exportar nuestro stack o sea las rutas de navegacion. El createAppContainer es el contenedor de rutas y el parametro es el que tiene las rutas
export default createAppContainer(NavigationStacks);
