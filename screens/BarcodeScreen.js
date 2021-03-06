import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Permissions, BarCodeScanner } from "expo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { scanCode, scanCodeSuccess, scanCodeFailure } from '../actions/barcodeActions';

class BarcodeScreen extends React.Component {
  state = {
    hasCameraPermission: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
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
              onBarCodeScanned={({data}) => this.props.scanCode(data)}
              style={StyleSheet.absoluteFill}
            />
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { barcode } = state;
  return { barcode };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    scanCode,
    scanCodeSuccess,
    scanCodeFailure
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeScreen);