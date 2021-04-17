// import { GoogleSpreadsheet } from 'google-spreadsheet';
// import { sheets_v4 } from 'googleapis';
import * as React from 'react';
import { Text } from 'react-native';
import Login from './src/pages/login';
import Scanning from './src/pages/scanning';

export default function App() {
  const [accessToken, setAccessToken] = React.useState<string>();

  if (accessToken) {
    return <Scanning accessToken={accessToken} />;
  } else {
    return <Login setAccessToken={setAccessToken} />;
  }
}
