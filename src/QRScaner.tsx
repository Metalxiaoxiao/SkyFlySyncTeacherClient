import * as React from 'react';
import {useCallback, useRef, useState} from 'react';
import { Alert, AlertButton, Animated, Linking, StyleSheet, View } from "react-native";
import {
  Code,
  useCameraDevice, useCameraPermission,
  useCodeScanner
} from "react-native-vision-camera";
import {Camera} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/core';

const showCodeAlert = (value: string, onDismissed: () => void): void => {
  const buttons: AlertButton[] = [
    {
      text: 'Close',
      style: 'cancel',
      onPress: onDismissed,
    },
  ];
  if (value.startsWith('http')) {
    buttons.push({
      text: 'Open URL',
      onPress: () => {
        Linking.openURL(value);
        onDismissed();
      },
    });
  }
  Alert.alert('Scanned Code', value, buttons);
};

export default function QRScanner(): React.ReactElement {
  const { hasPermission, requestPermission } = useCameraPermission()
  if (!hasPermission){
    requestPermission();
  }
  const device = useCameraDevice('back');

  // 2. Only activate Camera when the app is focused and this screen is currently opened
  const isFocused = useIsFocused();
  const isActive = isFocused;

  const [torch, setTorch] = useState(false);

  const isShowingAlert = useRef(false);

  const onCodeScanned = useCallback((codes: Code[]) => {
    console.log(`Scanned ${codes.length} codes:`, codes);
    const value = codes[0]?.value;
    if (value == null) {
      return;
    }
    if (isShowingAlert.current) {
      return;
    }

    showCodeAlert(value, () => {
      isShowingAlert.current = false;
    });
    isShowingAlert.current = true;
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: onCodeScanned,
  });

  return (
    <View style={styles.container}>
      {device != null && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          codeScanner={codeScanner}
          torch={torch ? 'on' : 'off'}
          enableZoomGesture={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
  },
  backButton: {
    position: 'absolute',
  },
});
