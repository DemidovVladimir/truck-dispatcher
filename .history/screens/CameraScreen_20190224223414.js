import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Permissions, BarCodeScanner } from "expo";

function debounced(delay, fn) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    qrFeedback: "try1"
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  handleBarCodeScanned = ({ type, data }) => {
        debounced(200, () => alert(`Bar code with type ${type} and data ${data} has been scanned!`))();
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 2 }}>
            <BarCodeScanner
              onBarCodeScanned={this.handleBarCodeScanned}
              style={StyleSheet.absoluteFill}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {this.state.qrFeedback}
            </Text>
          </View>
        </View>
      );
    }
  }
}
