import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Phone, Search, Ticket as TicketIcon, MapPin, Clock, Calendar } from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';
import Animated, { FadeIn } from 'react-native-reanimated';
import { bookingApi } from '../lib/api';

export default function TicketScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!phone) return;
    setLoading(true);
    try {
      const res = await bookingApi.getBookingsByPhone(phone);
      setTickets(res.data);
    } catch (e) {
      Alert.alert(
        "Sync Error",
        "Network Link Error: The transit hub returned a structural failure. Please check your connection.",
        [{ text: "OK", style: "default" }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Retrieve Your <Text style={styles.highlight}>Pass</Text></Text>
          <Text style={styles.subtitle}>Enter your phone number to sync with the matrix.</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <Phone size={20} color="#9ca3af" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity 
              style={styles.searchButton}
              onPress={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Search size={20} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {tickets.map((ticket, index) => (
          <Animated.View 
            key={ticket._id || index}
            entering={FadeIn.delay(200)}
            style={styles.ticketWrapper}
          >
            <LinearGradient
              colors={['#f7e49f', '#e5c167', '#d4af37']}
              style={styles.ticket}
            >
              <View style={styles.ticketMain}>
                <Text style={styles.ticketType}>Boarding Pass</Text>
                
                <View style={styles.routeRow}>
                  <View>
                    <Text style={styles.label}>From</Text>
                    <Text style={styles.value}>{ticket.boardingPoint || 'TRANSIT_HUB'}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.label}>To</Text>
                    <Text style={styles.value}>{ticket.destination || 'END_NODE'}</Text>
                  </View>
                </View>

                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <Calendar size={14} color="#5d4037" />
                    <Text style={styles.detailValue}>{new Date(ticket.bookingDate).toLocaleDateString()}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock size={14} color="#5d4037" />
                    <Text style={styles.detailValue}>{ticket.busId?.departureTime || 'LIVE'}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider}>
                <View style={styles.notchLeft} />
                <View style={styles.dashLine} />
                <View style={styles.notchRight} />
              </View>

              <View style={styles.ticketStub}>
                <View style={styles.qrContainer}>
                  <QRCode
                    value={ticket.qrToken || ticket.ticketId}
                    size={100}
                    color="#2d1a12"
                    backgroundColor="transparent"
                  />
                </View>
                <Text style={styles.ticketId}>{ticket.ticketId}</Text>
                <Text style={styles.busInfo}>{ticket.busId?.busNumber} | Seat: {ticket.seats?.[0]}</Text>
              </View>
            </LinearGradient>
          </Animated.View>
        ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
    letterSpacing: -1,
  },
  highlight: {
    color: '#EA580C',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
  },
  searchContainer: {
    marginBottom: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    paddingLeft: 20,
    paddingRight: 8,
    height: 70,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#EA580C',
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  ticketWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 15,
  },
  ticket: {
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(184, 134, 11, 0.3)',
  },
  ticketMain: {
    padding: 30,
  },
  ticketType: {
    fontSize: 10,
    fontWeight: '900',
    color: 'rgba(93, 64, 55, 0.5)',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 20,
  },
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  label: {
    fontSize: 9,
    fontWeight: '900',
    color: 'rgba(93, 64, 55, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '900',
    color: '#5d4037',
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5d4037',
  },
  divider: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  notchLeft: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    left: -12,
  },
  notchRight: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    right: -12,
  },
  dashLine: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(93, 64, 55, 0.2)',
    marginHorizontal: 30,
  },
  ticketStub: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  qrContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 15,
  },
  ticketId: {
    fontSize: 12,
    fontWeight: '900',
    color: 'rgba(93, 64, 55, 0.4)',
    letterSpacing: 1,
  },
  busInfo: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(93, 64, 55, 0.6)',
    marginTop: 4,
    textTransform: 'uppercase',
  }
});
