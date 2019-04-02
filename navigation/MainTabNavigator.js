import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import BarcodeScreen from '../screens/BarcodeScreen';
import MapScreen from '../screens/MapScreen';
import ErrorScreen from "../screens/ErrorScreen";

const ErrorStack = createStackNavigator({
  Error: ErrorScreen,
});

ErrorStack.navigationOptions = {
  tabBarLabel: 'Error',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const BarcodeStack = createStackNavigator({
  ScanBarcode: BarcodeScreen
});

BarcodeStack.navigationOptions = {
  tabBarLabel: 'Scan QR code',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused = {focused}
      name = {
        Platform.OS === 'ios'
          ? 'ios-qr-scanner'
          : 'md-information-circle'
      }
    />
  )
};

const MapStack = createStackNavigator({
  Map: MapScreen
});

MapStack.navigationOptions = {
  tabBarLabel: 'Select an order',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused = {focused}
      name = {
        Platform.OS === 'ios'
          ? 'ios-map'
          : 'md-information-circle'
      }
    />
  )
};

export default createBottomTabNavigator({
  BarcodeStack,
  MapStack,
  ErrorStack
});
