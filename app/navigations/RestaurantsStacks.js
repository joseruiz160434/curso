//Este es el que va aquedar estatico por lo que veo
import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreenjose from "../screens/Restaurants/Restaurants"; //RestaurantsScreenjose es una variable cualquiera
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurant";

//RestaurantsScreenStacks tiene lo que se mostraria en la vista de Restaurants
//RestaurantsScreenStacks es = a la creacion de nuevos stack de navegacion
const RestaurantsScreenStacks = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreenjose, //aca en screen agregamos la que hemos importado abajo
    //las opciones de navegacion
    navigationOptions: () => ({
      title: "Restuarantes"
    })
  },
  AddRestaurant: {
    screen: AddRestaurantScreen,
    navigationOptions: () => ({
      title: "Nuevo Restaurante"
    })
  }
});

//Exportamos nuestro Stack de restaurante
export default RestaurantsScreenStacks;
