import * as Location from 'expo-location';

export default async function getCurrentLocation() {
  // Location.req
  let { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    // setErrorMsg('Permission to access location was denied');
    alert('Permission to access location was denied');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});

  const address = await Location.reverseGeocodeAsync(location.coords);

  return address;
}
