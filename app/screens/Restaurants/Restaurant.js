import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, View, Text, Dimensions } from "react-native";
import { Rating, Icon, ListItem } from "react-native-elements";
import Carousel from "../../components/Carousel";
import Map from "../../components/Map";
import ListReviews from "../../components/Restaurants/ListReviews";
import Toast from "react-native-easy-toast";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
  const { navigation } = props;
  const { restaurant } = navigation.state.params;
  const [imagesRestaurant, setImagesRestaurant] = useState([]);
  const [rating, setRating] = useState(restaurant.rating);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  //console.log(rating)
  // console.log(imagesRestaurant);
  //console.log(restaurant);
  //console.log(restaurant);

  useEffect(() => {
    const arrayUrls = [];
    (async () => {
      await Promise.all(
        restaurant.images.map(async idImage => {
          await firebase
            .storage()
            .ref(`restaurantImages/${idImage}`)
            .getDownloadURL()
            .then(imageUrl => {
              //console.log(imageUrl);

              arrayUrls.push(imageUrl);
            });
        })
      );
      setImagesRestaurant(arrayUrls);
    })();
  }, []);

  useEffect(() => {
    if (userLogged) {
      db.collection("favorites")
        .where("idRestaurant", "==", restaurant.id)
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then(response => {
          if (response.docs.length === 1) {
            setIsFavorite(true);
          }
        });
    }
  }, []);

  const addFavorite = () => {
    if (!userLogged) {
      toastRef.current.show(
        "Para usar el sistema de favoritos,Tienes que estar logueado",
        5000
      );
    } else {
      const payload = {
        idUser: firebase.auth().currentUser.uid,
        idRestaurant: restaurant.id
      };

      db.collection("favorites")
        .add(payload)
        .then(() => {
          setIsFavorite(true);
          toastRef.current.show("Restaurante añadido a la lista de favoritos");
        })
        .catch(() => {
          toastRef.current.show(
            "Error al añadir a la lista de favoritos, intentelo, más tarde"
          );
        });
    }
  };

  const removeFavorite = () => {
    db.collection("favorites")
      .where("idRestaurant", "==", restaurant.id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then(response => {
        response.forEach(doc => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsFavorite(false);
              toastRef.current.show(
                "Restaurante eliminado de la lista de favoritos"
              );
            })
            .catch(() => {
              toastRef.current.show(
                "No se ha podido eliminar el restaurante de favoritos"
              );
            });
        });
      });
    setIsFavorite(false);
  };

  return (
    <ScrollView style={styles.viewBody}>
      <View style={styles.viewFavorite}>
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          onPress={isFavorite ? removeFavorite : addFavorite}
          color={isFavorite ? "#00a680" : "#000"}
          underlayColor="transparent"
        />
      </View>
      <Carousel
        arrayImages={imagesRestaurant}
        width={screenWidth}
        height={200}
      />
      <TitleRestaurant
        name={restaurant.name}
        description={restaurant.description}
        width={screenWidth}
        height={250}
        rating={rating}
      />

      <RestaurantInfo
        location={restaurant.location}
        name={restaurant.name}
        address={restaurant.address}
      />
      <ListReviews
        navigation={navigation}
        idRestaurant={restaurant.id}
        setRating={setRating}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </ScrollView>
  );
}

function TitleRestaurant(props) {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameRestaurant}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  );
}

//TO DO HACER LO ULTIMO DEL VIDEO  95 QUE NO LO HIZO PERO MANDO HACER
//TRAER LA INFO Y AÑADIRLA y que aparesca la descripcion del restaurante
function RestaurantInfo(props) {
  const { location, name, address } = props;

  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null
    },

    {
      text: "111 222 333",
      iconName: "phone",
      iconType: "material-community",
      action: null
    },
    {
      text: "JoseRUIZ160434@GMAIL.COM",
      iconName: "at",
      iconType: "material-community",
      action: null
    }
  ];

  return (
    <View style={styles.viewRestaurantInfo}>
      <Text style={styles.viewRestaurantInfoTitle}>
        Informacion del Restaurante
      </Text>
      <Map location={location} name={name} height={100} />
      {listInfo.map((item, index) => (
        <ListItem
          key={index}
          title={item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: "#00a680"
          }}
          containerStyle={styles.containerListItem}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewFavorite: {
    position: "absolute",
    top: 10,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    padding: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  viewRestaurantTitle: {
    margin: 15
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold"
  },
  rating: {
    position: "absolute",
    right: 0
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "#BFB6B4"
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25
  },
  viewRestaurantInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1
  }
});
