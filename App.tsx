import { sheets_v4 } from 'googleapis';
import * as React from 'react';
import { Text } from 'react-native';
import Login from './src/pages/login';
import Scanning from './src/pages/scanning';

export default function App() {
  const [accessToken, setAccessToken] = React.useState<string>();
  const [googleSheets, setGoogleSheets] = React.useState<sheets_v4.Sheets>();

  if (googleSheets) {
    return <Scanning googleSheets={googleSheets} />;
  } else {
    return <Login setAccessToken={setAccessToken} setGoogleSheets={setGoogleSheets} />;
  }
}
