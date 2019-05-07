import './config/ReactotronConfig';

import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import Todo from '~/components/Todo';

export default class App extends Component {
  state = {
    todos: { id: 0, text: 'Fazer café' },
  };

  handleAddTodo = () => {
    this.setState({
      todos: [...this.state.todos, { id: Math.random(), text: 'Novo' }],
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.todos.map(todo => (
          <Todo key={todo.id} title={todo.text} />
        ))}
        <Button title="Adicionar todo" onPress={this.handleAddTodo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
