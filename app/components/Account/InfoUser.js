import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

//TO DO HACER EL VIDEO 48-49 DE SUBIR EL AVATAR

//recibe props de UseLogged que es la info del usuario
export default function InfoUser(props) {
  //hacemos uso del doble destructuring userinfo: abrimos objeto {del usaurio sacamos ls variables}
  const {
    userInfo,
    userInfo: { photoURL, uid, displayName, email },
    setReloadData, //viene de userlogged es para acutlizar el avatar de una
    toastRef, //viene de userLogged lo recuperamos
    setIsLoading, //recuperando el cargando
    setTextLoading //el texto
  } = props;
  //console.log(userInfo);

  const changeAvatar = async () => {
    //Preguntar al usuario si podemos acceder a su camara o galeria de imagenes
    //espera  a que los permisos y la funcion ask pide permisos a camara roll
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    //devuelve un objeto  con los permisos y si el status si acepto o no
    //console.log(resultPermission);
    //tomamos el solo valor del estado granted o denied del objeto de permisos toma el objeto de permission y en ese toma el objeto de cameraRoll y en ese el status
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      //si el permiso es denegada
      toastRef.current.show("Es necesario aceptar los permisos de la galeria");
    } else {
      //si entra aca es que acepto permisos
      //abre el imagePicker (galeria) hace la funcion y dentro metemos un objeto
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if (result.cancelled) {
        //si cancelo la seleccion de imagenes
        toastRef.current.show("Haz cerrado la galeria de imagenes");
      } else {
        // si entra aca es porque escogio una imagen
        //el resultado es uri y como nombre de laimagen queremos que sea el uid del usuario para que cada vez que cambie cambie la imagen hara es sustituir la imagen en el storage
        //console.log(result.uri, result.uid); el uri y el uid es el nombre de correo si se loguea normal aparece nulo si es por face el correo
        UploadImage(result.uri, uid).then(() => {
          toastRef.current.show("imagen subida correctamente");
          //funcion para actualizar la imgagen en la pantalla
          updatePhotoUrl(uid);
        });
      }
    }
    //console.log("uri: " + uri);
    //console.log("nameImage: " + nameImagen);
  };

  //funcion para subir la imagen a firebase
  const UploadImage = async (uri, nameImagen) => {
    //el texto que
    setTextLoading(`Actulizando avatar del correo ${email} `);
    //va abrir el Loading con ese texto
    setIsLoading(true);
    const response = await fetch(uri); //nos devuelve unos datos de la imagen y tomamos blob para obtener la imagen
    //console.log(response);
    //tomamos el obejto blob
    const blob = await response.blob();
    //console.log(blob) //esto es lo que vamos a coger y subir a firebase

    const ref = firebase
      .storage() //para acceder al storage
      .ref()
      .child(`avatar/${nameImagen}`); //aca e decimos donde vamos a guardar  y le damos de nombre el nameImage que es el uid
    return ref.put(blob); // retorna ref. put(para subirlo) y blob
    // console.log(blob);
    //console.log(uri);
  };

  //funcion para actulizar la informcion en el usuario pasmos el parametro uid y es uid para obetenr la
  //imagen mediante el uid que le hemos añadido
  const updatePhotoUrl = uid => {
    firebase
      .storage() //se concecta firebase
      .ref(`avatar/${uid}`) //hago referencia a la imagen que ese uid
      .getDownloadURL() //para que me devuelva la url de la imagen
      .then(async result => {
        //si es correcto entrar aqui
        const update = {
          //upadate es igual a un objeto
          photoURL: result //photo es igual a result en el result llega la url de la foto
        };
        //espera que se conecte a firebase en el usuarioactual y updateProfile funcion de libreria  y coloco el update
        await firebase.auth().currentUser.updateProfile(update);

        setReloadData(true); //se ejecuta en esta funcion  y con esto conseguimos que refresque la informacion del usuario cuando avatar ha sido actualizado
        //cambiar a false para quitar el cargando
        setIsLoading(false);
      })
      .catch(() => {
        toastRef.current.show("error al recuperar el  avatar del servidor");
      });
  };

  //a la funcion le pasamos la uri de la imagen y el nombredelaimagen

  //devuelve granted si acepta permisos o denied si niega permisos
  //console.log(resultPermission);

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded //pa que sea redondo
        size="large" //tamño large para que sea grande
        showEditButton //un boton para editar
        onEditPress={changeAvatar} //para cuando presionen el boton va a llamar a la funcion
        containerStyle={styles.userInfoAvatar}
        source={{
          //para añadir la imagen
          //si photoURL existe añade photoURL si no añade la imagen de la web
          uri: photoURL
            ? photoURL
            : "https://api.adorable.io/avatars/266/abott@adorable.png"
        }}
      />
      <View>
        <Text style={styles.displayName}>
          {/* si el sisplayNmae existe  imprime displayname y si no impirme texto anonimo */}
          {displayName ? displayName : "Anonimo"}
        </Text>
        <Text>{email ? email : "Login con Facebook"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center", //centrar el item
    justifyContent: "center", //centrar texto
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30
  },
  userInfoAvatar: {
    marginRight: 20
  }
});
