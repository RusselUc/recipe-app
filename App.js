import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from './components/Button';
import { createUser, signin } from './api/service';
import axios from 'axios';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';

export default function App() {
  return (
    <Navigation />
  );
}