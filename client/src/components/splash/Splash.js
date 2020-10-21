import React, {Component} from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (this.props.auth.user) {
        Actions.welcome();
      } else {
        Actions.auth();
      }
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/wall.jpeg')}
          style={styles.imageBackground}>
          <Text style={styles.title1}> What </Text>
          <Text style={styles.title2}>To Do?</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title1: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 8,
  },
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(Splash);
