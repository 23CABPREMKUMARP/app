import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, MapPin, Ticket, BookOpen, QrCode } from 'lucide-react-native';

// Placeholder Screens
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ScanScreen from '../screens/ScanScreen';
import TicketScreen from '../screens/TicketScreen';
import BookingsScreen from '../screens/BookingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CustomTabBarButton({ children, onPress }: any) {
  return (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow
      }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={{
        width: 65,
        height: 65,
        borderRadius: 35,
        backgroundColor: '#000',
        borderWidth: 4,
        borderColor: '#fff',
      }}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          backgroundColor: '#ffffff',
          position: 'absolute',
          elevation: 0,
        },
        tabBarActiveTintColor: '#EA580C',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '900',
          textTransform: 'uppercase',
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Track" 
        component={MapScreen} 
        options={{
          tabBarIcon: ({ color }) => <MapPin size={22} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Scan" 
        component={ScanScreen} // Point to the new dedicated ScanScreen
        options={{
          tabBarIcon: () => <QrCode size={30} color="#fff" />,
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )
        }}
      />
      <Tab.Screen 
        name="Pass" 
        component={TicketScreen} 
        options={{
          tabBarIcon: ({ color }) => <Ticket size={22} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Trips" 
        component={BookingsScreen} 
        options={{
          tabBarIcon: ({ color }) => <BookOpen size={22} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  }
});

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      {/* Add more stack screens here for drill-downs */}
    </Stack.Navigator>
  );
}
