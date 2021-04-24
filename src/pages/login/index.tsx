import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { CLIEND_ID } from '../../consts/google';

WebBrowser.maybeCompleteAuthSession();

interface LoginProps {
  setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function Login({ setAccessToken }: LoginProps) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: CLIEND_ID,
    webClientId: CLIEND_ID,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets.readonly',
      'https://www.googleapis.com/auth/spreadsheets',
      // 'https://www.googleapis.com/auth/drive.readonly',
      // 'https://www.googleapis.com/auth/drive.file',
      // 'https://www.googleapis.com/auth/drive',
    ],
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      const accessToken = authentication?.accessToken;

      if (!accessToken) {
        alert('auth failed');
        return;
      }
      setAccessToken(accessToken);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.jpeg')} style={styles.logo} />
      <TouchableOpacity
        onPress={() => {
          promptAsync();
        }}
        style={styles.button}
        disabled={!request}
      >
        <Text style={{ fontSize: 20, color: '#fff' }}>Login by Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    width: (Dimensions.get('window').height * 20 * 1.5) / 100,
    height: (Dimensions.get('window').height * 20) / 100,
    alignSelf: 'center',
    marginTop: (Dimensions.get('window').height * 10) / 100,
  },

  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'blue',
    position: 'absolute',
    width: Dimensions.get('window').width,
    top: (Dimensions.get('window').height * 50) / 100,
  },
});
