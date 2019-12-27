import * as firebase from "firebase";

//reauthenticate es porque para poder cambiar el email necesitmaos hacer un reloguin para poder
//cambair el correo porque el loguin tiene que ser reciente para que nos deje cambiar el correo
//recibe el password
export const reauthenticate = password => {
  //recuperar datos del usuario
  const user = firebase.auth().currentUser;
  //para obtener los datos email, y password
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  //retorna  la authenticacion con credenciales de email y password
  return user.reauthenticateWithCredential(credentials);
};
