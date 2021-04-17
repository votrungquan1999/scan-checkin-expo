import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { google, sheets_v4 } from 'googleapis';
import React, { useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

interface LoginProps {
  setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  setGoogleSheets: React.Dispatch<React.SetStateAction<sheets_v4.Sheets | undefined>>;
}

export default function Login({ setAccessToken, setGoogleSheets }: LoginProps) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '280644384387-7ch9hlp9doqigd1460lk9q7ccav777cg.apps.googleusercontent.com',
    webClientId: '280644384387-7ch9hlp9doqigd1460lk9q7ccav777cg.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      const accessToken = authentication?.accessToken;

      if (!accessToken) {
        alert('auth failed');
        return;
      }

      const sheets = AuthGoogleSheet(accessToken);
      setAccessToken(accessToken);
      setGoogleSheets(sheets);
    }
  }, [response]);

  const AuthGoogleSheet = useCallback((accessToken: string) => {
    const oAuth2Client = new google.auth.OAuth2({
      clientId: '280644384387-7ch9hlp9doqigd1460lk9q7ccav777cg.apps.googleusercontent.com',
      clientSecret: 'OSkknC2v1QvbCia0ZzF3fDE-',
    });

    oAuth2Client.setCredentials({ access_token: accessToken });

    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

    return sheets;
  }, []);

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
