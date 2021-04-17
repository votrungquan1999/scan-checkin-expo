import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
// import { google, sheets_v4 } from 'googleapis';
import React, { useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CLIEND_ID } from '../../consts/google';
// import { CLIEND_ID } from '../../consts/sheets';
// import { GoogleSpreadsheet } from 'google-spreadsheet';

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
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive',
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
    <>
      <TouchableOpacity
        onPress={() => {
          promptAsync();
        }}
        style={{ backgroundColor: 'blue', marginTop: 100 }}
        disabled={!request}
      >
        <Text style={{ fontSize: 20, color: '#fff', marginTop: 100 }}>Login by Google</Text>
      </TouchableOpacity>
    </>
  );
}
