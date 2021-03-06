import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Permissions, BarCodeScanner } from "expo";
import { connect } from "react-redux";

class CameraScreen extends React.Component {
  // constructor(props) {
  //   super(props);
    
  // }

  state = {
    hasCameraPermission: null,
    barcode: 'props.barcode.qrCodeData'
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  handleBarCodeScanned = ({ type, data }) => {
      this.setState({
        barcode: data
      })
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
            <Text style={{ fontSize: 18, marginBottom: 10, color: "black" }}>
              {this.state.barcode}
            </Text>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { barcode } = state;
  return { barcode };
}

export default connect(mapStateToProps)(CameraScreen);
