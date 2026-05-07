import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, MapPin, Ticket, BookOpen, User } from 'lucide-react-native';

// Placeholder Screens
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import TicketScreen from '../screens/TicketScreen';
import BookingsScreen from '../screens/BookingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          backgroundColor: '#ffffff',
        },
        tabBarActiveTintColor: '#EA580C',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Track" 
        component={MapScreen} 
        options={{
          tabBarIcon: ({ color }) => <MapPin size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Pass" 
        component={TicketScreen} 
        options={{
          tabBarIcon: ({ color }) => <Ticket size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Trips" 
        component={BookingsScreen} 
        options={{
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      {/* Add more stack screens here for drill-downs */}
    </Stack.Navigator>
  );
}
