import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Plataform,
} from 'react-native';
import PropTypes from 'prop-types';

export default class Todo extends Component {
  static defaultProps = {
    title: 'Todo padrão',
  };

  static proptypes = {
    // quando pe obrigatório não precisa do defaultProps
    title: PropTypes.string.isRequired,
  };

  render() {
    return <View>{Plataform.OS === 'ios' ? <Text>iOS</Text> : <Text>Android</Text>}</View>;
  }
}

const styles = StyleSheet.create({
  text: {
    ...Plataform.select({
      ios: {},
      android: {},
    }),
  },
});
