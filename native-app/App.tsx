import 'react-native-gesture-handler';
import React from 'react';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('./assets/logo2.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Secure Access</Text>
        <Text style={styles.subtitle}>Enter the JeffBen matrix to manage your transit ecosystem.</Text>
        
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Sign In with Clerk</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ClerkProvider 
      publishableKey="pk_test_Y2xlcmsuamVmZmJlbi5vcmck" // Placeholder
      tokenCache={tokenCache}
    >
      <NavigationContainer>
        {/* For demo purposes, we show the navigator directly */}
        {/* <SignedIn> */}
          <AppNavigator />
        {/* </SignedIn>
        <SignedOut>
          <AuthScreen />
        </SignedOut> */}
      </NavigationContainer>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#EA580C',
    width: '100%',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  }
});
