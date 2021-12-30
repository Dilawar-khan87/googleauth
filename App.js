// import React from 'react';
// import {View, Text, Button} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// export default function App() {
//   const [token, setToken] = React.useState('');
//   React.useEffect(() => {
//     GoogleSignin.configure({
//       webClientId:
//         '39752560275-jhh3h1mdl443ndpo9kq1oir5e49j46si.apps.googleusercontent.com',
//     });
//   }, []);
//   async function onGoogleButtonPress() {
//     try {
//       // Get the users ID token
//       const {idToken} = await GoogleSignin.signIn();
//       console.log('token',idToken);
//       setToken(idToken);
//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//       console.log('google credentials',googleCredential);
//       // Sign-in the user with the credential
//       return auth().signInWithCredential(googleCredential);
//     } catch (error) {
//       console.log('error',error);
//     }
//   }
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     <Button title="Google Sign-In" onPress={() => onGoogleButtonPress()} />
//     <Text>{token}</Text>
//     </View>
//   );
// }

import React from 'react';
import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export default function App() {
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <Button title="Facebook Sign-In" onPress={() => onFacebookButtonPress()} />
  );
}
