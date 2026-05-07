import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { Alert, Linking } from 'react-native';

export const requestLocationPermission = async () => {
  try {
    const { status, canAskAgain } = await Location.getForegroundPermissionsAsync();
    
    if (status === 'granted') return true;

    if (!canAskAgain) {
      Alert.alert(
        "Location Required",
        "JeffBen needs location access to track fleet near you. Please enable it in system settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Settings", onPress: () => Linking.openSettings() }
        ]
      );
      return false;
    }

    const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
    return newStatus === 'granted';
  } catch (error) {
    console.error("Location permission error:", error);
    return false;
  }
};

export const requestCameraPermission = async () => {
  try {
    const { status, canAskAgain } = await Camera.getCameraPermissionsAsync();
    
    if (status === 'granted') return true;

    if (!canAskAgain) {
      Alert.alert(
        "Camera Required",
        "JeffBen needs camera access to scan bus QR codes. Please enable it in system settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Settings", onPress: () => Linking.openSettings() }
        ]
      );
      return false;
    }

    const { status: newStatus } = await Camera.requestCameraPermissionsAsync();
    return newStatus === 'granted';
  } catch (error) {
    console.error("Camera permission error:", error);
    return false;
  }
};
