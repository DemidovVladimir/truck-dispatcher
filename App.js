import React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import BarcodeReducer from './reducers/BarcodeReducer';
import MapReducer from './reducers/MapReducer';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { compose } from 'redux';
import rootEpics from './root';
import thunk from 'redux-thunk';
import NavigatorService from './services/NavigatorService';
import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

const analyticsConfig = {
    AWSPinpoint: {
        // Amazon Pinpoint App Client ID
        appId: '<redacted>',
        // Amazon service region
        region: 'us-east-1',
        mandatorySignIn: false,
    }
};

Amplify.Analytics.configure(analyticsConfig);

// Store configuration
const epicMiddleware = createEpicMiddleware();
// Configure Devtools for redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const featureReducers = combineReducers({
  map: MapReducer,
  barcode: BarcodeReducer
})

const store = createStore(
  featureReducers,
  composeEnhancers(
    applyMiddleware(
      logger,
      thunk,
      epicMiddleware
    )
  )
);

// Start rxjs redux effects
epicMiddleware.run(rootEpics);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator ref={navigatorRef => {
                NavigatorService.setContainer(navigatorRef);
              }}/>
            </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
