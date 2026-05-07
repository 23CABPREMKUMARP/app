import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { QrCode, X, Zap } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';
import { requestCameraPermission } from '../lib/permissions';

export default function ScanScreen({ navigation }: any) {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const granted = await requestCameraPermission();
        setHasPermission(granted);
        setScanned(false);
      })();
    }
  }, [isFocused]);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    Alert.alert(
      "Bus Identified",
      `Bus Hub Link Established: ${data}\nProceed to booking?`,
      [
        { text: "Cancel", onPress: () => setScanned(false), style: "cancel" },
        { text: "Book Now", onPress: () => navigation.navigate('Pass', { busId: data }) }
      ]
    );
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting Camera Access...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          enableTorch={torch}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <SafeAreaView style={styles.overlay}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                <X color="#fff" size={24} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Scan to Book</Text>
              <TouchableOpacity onPress={() => setTorch(!torch)} style={styles.iconBtn}>
                <Zap color={torch ? "#EAB308" : "#fff"} size={24} fill={torch ? "#EAB308" : "transparent"} />
              </TouchableOpacity>
            </View>

            <View style={styles.main}>
              <View style={styles.scannerTarget}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
                <View style={styles.scanLine} />
              </View>
              <Text style={styles.hint}>Point at the QR code on the bus dashboard</Text>
            </View>

            <View style={styles.footer}>
              <View style={styles.infoBox}>
                <QrCode color="#EA580C" size={20} />
                <Text style={styles.infoText}>Scanning for JeffBen Matrix nodes...</Text>
              </View>
            </View>
          </SafeAreaView>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerTarget: {
    width: 280,
    height: 280,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#EA580C',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 5,
    borderTopWidth: 5,
    borderTopLeftRadius: 20,
  },
  topRight: {
    top: 0,
    right: 0,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderTopRightRadius: 20,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderBottomLeftRadius: 20,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderBottomRightRadius: 20,
  },
  scanLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#EA580C',
    position: 'absolute',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  hint: {
    color: '#fff',
    marginTop: 40,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  footer: {
    padding: 40,
    alignItems: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
  },
  infoText: {
    color: '#1f2937',
    fontSize: 12,
    fontWeight: '700',
  }
});
