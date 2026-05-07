import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { History, ChevronRight, Zap } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { bookingApi } from '../lib/api';

export default function BookingsScreen() {
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('https://app-jeffben.vercel.app/api/bookings/all'); 
        const data = await res.json();
        setBookings(data);
      } catch (e) {
        console.error("Booking discovery error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your <Text style={styles.highlight}>Trips</Text></Text>
        <Text style={styles.subtitle}>Historical data from the transit matrix hub.</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={item => item._id || item.ticketId}
        renderItem={({ item, index }) => (
          <Animated.View 
            entering={FadeInRight.delay(index * 100)}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateText}>{new Date(item.bookingDate).toLocaleDateString()}</Text>
              </View>
              <Text style={styles.amountText}>₹{item.totalAmount}</Text>
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.iconContainer}>
                 <Zap size={20} color="#EA580C" />
              </View>
              <View>
                <Text style={styles.routeText}>{item.boardingPoint} → {item.destination}</Text>
                <Text style={styles.busText}>{item.busId?.busNumber || 'JB-FLEET'}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>ID: {item.ticketId}</Text>
              <ChevronRight size={16} color="#9ca3af" />
            </TouchableOpacity>
          </Animated.View>
        )}
        ListEmptyComponent={loading ? <ActivityIndicator size="large" color="#EA580C" style={{ marginTop: 40 }} /> : null}
        contentContainerStyle={{ padding: 24, gap: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    paddingBottom: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    letterSpacing: -1,
  },
  highlight: {
    color: '#EA580C',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  dateText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  busText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    marginTop: 2,
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  detailText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});
