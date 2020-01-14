import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useDebouncedCallback } from "use-debounce";
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch();
  }, [search]);

  const [onSearch] = useDebouncedCallback(() => {
    if (search) {
      fireSQL
        .query(`SELECT * FROM restaurants WHERE name LIKE '${search}%'`)
        .then(response => {
          //console.log(response);
          setRestaurants(response);
        });
    }
  }, 300);

  return (
    <View>
      <SearchBar
        placeholder="Busca tu restaurante..."
        onChangeText={e => setSearch(e)}
        value={search}
        containerStyle={styles.SearchBar}
      />
      {restaurants.length === 0 ? (
        <NoFoundRestaurants />
      ) : (
        <FlatList
          data={restaurants}
          renderItem={restaurant => (
            <Restaurant restaurant={restaurant} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { name, images } = restaurant.item;
  const [imagesRestaurant, setImagesRestaurant] = useState(null);

  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`restaurantImages/${image}`)
      .getDownloadURL()
      .then(response => {
        setImagesRestaurant(response);
      });
  }, []);

  return (
    <ListItem
      title={name}
      leftAvatar={{ source: { uri: imagesRestaurant } }}
      rightIcon={<Icon type="material-community" name="chevron-right" />}
      onPress={() =>
        navigation.navigate("Restaurant", { restaurant: restaurant.item })
      }
    />
  );
}

function NoFoundRestaurants() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../assets/img/no-result-found.png")}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  SearchBar: {
    marginBottom: 20
  }
});
