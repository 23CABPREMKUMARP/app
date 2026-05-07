import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Dimensions,
  Platform,
  Text,
  FlatList
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Search, MapPin, Navigation, Bus, QrCode } from 'lucide-react-native';
import * as Location from 'expo-location';
import { busApi } from '../lib/api';
import { requestLocationPermission, requestCameraPermission } from '../lib/permissions';
import { CameraView } from 'expo-camera';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buses, setBuses] = useState<any[]>([]);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    (async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setPermissionDenied(true);
        setLoading(false);
        return;
      }
      
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      
      try {
        const res = await busApi.getBuses();
        setBuses(res.data);
      } catch (e) {
        console.error("Failed to fetch buses from matrix hub");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (permissionDenied) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 40 }]}>
        <MapPin size={64} color="#EA580C" style={{ marginBottom: 20 }} />
        <Text style={{ fontSize: 20, fontWeight: '900', textAlign: 'center', marginBottom: 12 }}>GPS Access Required</Text>
        <Text style={{ textAlign: 'center', color: '#6b7280', marginBottom: 30, lineHeight: 22 }}>
          We need your location to show nearby buses and provide accurate arrival times.
        </Text>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={async () => {
            const hasPermission = await requestLocationPermission();
            if (hasPermission) setPermissionDenied(false);
          }}
        >
          <Text style={styles.ctaText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 11.0168,
          longitude: 76.9558,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {buses.map(bus => (
          <Marker
            key={bus._id}
            coordinate={{ 
              latitude: bus.location?.lat || 11.0168, 
              longitude: bus.location?.lng || 76.9558 
            }}
            title={bus.busNumber}
            description={bus.routeId?.routeName}
          >
            <View style={styles.busMarker}>
               <Bus size={20} color="#fff" />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Floating Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9ca3af" style={{ marginRight: 12 }} />
          <TextInput
            placeholder="Find a bus or route..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity 
            style={styles.qrButton}
            onPress={async () => {
              const hasPermission = await requestCameraPermission();
              if (hasPermission) setShowScanner(true);
            }}
          >
            <QrCode size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {showScanner && (
        <View style={StyleSheet.absoluteFill}>
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            onBarcodeScanned={({ data }) => {
              setShowScanner(false);
              Alert.alert("Bus Identified", `Neural Link established with fleet node: ${data}`);
            }}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <TouchableOpacity 
                style={styles.closeScanner}
                onPress={() => setShowScanner(false)}
              >
                <Text style={{ color: '#fff', fontWeight: '900' }}>CLOSE</Text>
              </TouchableOpacity>
              <View style={styles.scannerOverlay}>
                <View style={styles.scannerTarget} />
              </View>
            </SafeAreaView>
          </CameraView>
        </View>
      )}

      {/* Floating Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Navigation size={22} color="#EA580C" />
        </TouchableOpacity>
      </View>

      {/* Bottom Panel (Simulated) */}
      <View style={styles.bottomPanel}>
        <View style={styles.panelHandle} />
        <Text style={styles.panelTitle}>Nearby Fleet</Text>
        <FlatList
          data={buses}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.busCard}>
              <View style={styles.cardIcon}>
                <Bus size={24} color="#EA580C" />
              </View>
              <View>
                <Text style={styles.cardTitle}>{item.busNumber}</Text>
                <Text style={styles.cardSub}>{item.routeId?.routeName || 'Transit Route'}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  qrButton: {
    backgroundColor: '#000',
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  busMarker: {
    backgroundColor: '#EA580C',
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  controls: {
    position: 'absolute',
    right: 20,
    top: height / 2 - 50,
  },
  controlButton: {
    backgroundColor: '#fff',
    width: 54,
    height: 54,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 20,
  },
  panelHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#f3f4f6',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    paddingHorizontal: 24,
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  busCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 24,
    gap: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    width: 280,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  cardSub: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  ctaButton: {
    backgroundColor: '#000',
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeScanner: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  scannerOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerTarget: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#EA580C',
    backgroundColor: 'transparent',
    borderRadius: 24,
  }
});
