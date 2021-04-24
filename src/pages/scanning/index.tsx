import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import processScannedValue from '../../utils/processScannedValue';

interface ScanningProps {
  accessToken: string;
}

export default function Scanning({ accessToken }: ScanningProps) {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned! Please wait for processing!`);

    processScannedValue(accessToken, data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.jpeg')} style={styles.logo} />
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.cameraView} />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  logo: {
    width: (Dimensions.get('window').height * 10 * 1.5) / 100,
    height: (Dimensions.get('window').height * 10) / 100,
    alignSelf: 'center',
    marginBottom: (Dimensions.get('window').height * 5) / 100,
  },

  cameraView: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height * 80) / 100,
  },
});
