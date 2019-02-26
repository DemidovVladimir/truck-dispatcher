import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NavigatorIOS,
  Linking,
} from "react-native";

import QRCodeScanner from 'react-native-qrcode-scanner';
  
import { WebBrowser } from "expo";
import QRCode from "react-native-qrcode";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    text: "Sveta - konfeta"
  };

  _requestCameraPermission = permission => {
    Permissions.request(permission).then(response => {
      this.setState({ cameraPermission: response });
    });
  };

  onSuccess(e) {
    Linking.openURL(e.data).catch(err =>
      console.error("An error occured", err)
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/logo.jpg")
                  : require("../assets/images/robot-prod.png")
              }
              style={styles.welcomeImage}
            />
          </View>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Please Scan QR code</Text>

            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            >
              <QRCode
                value={this.state.text}
                size={200}
                bgColor="purple"
                fgColor="white"
              />
            </View>
          </View>
          <View style={styles.container}>
            <TouchableHighlight
              style={[styles.button, styles[this.state.status[camera]]]}
              key={camera}
              onPress={() => this._requestCameraPermission(camera)}
            >
              <View>
                <Text style={styles.subtext}>{this.state.status[camera]}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <NavigatorIOS
            initialRoute={{
              component: QRCodeScanner,
              title: "Scan Code",
              passProps: {
                onRead: this.onSuccess.bind(this),
                topContent: (
                  <Text style={styles.centerText}>
                    Go to{" "}
                    <Text style={styles.textBold}>
                      wikipedia.org/wiki/QR_code
                    </Text>{" "}
                    on your computer and scan the QR code.
                  </Text>
                ),
                bottomContent: (
                  <TouchableOpacity style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>OK. Got it!</Text>
                  </TouchableOpacity>
                )
              }
            }}
            style={{ flex: 1 }}
          />
        </ScrollView>
      </View>
    );
  }

  // _handleLearnMorePress = () => {
  // WebBrowser.openBrowserAsync(
  // "https://docs.expo.io/versions/latest/guides/development-mode"
  // );
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
