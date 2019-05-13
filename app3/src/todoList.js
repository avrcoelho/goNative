import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as TodosActions from './store/actions/todos';

const TodoList = ({ todos, addTodo, markAsCompleted }) => (
  <View style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center' }}>
    {todos.map(todo => <Text onPress={markAsCompleted} style={{ textDecorationLine: todo.completed ? 'line-through' : 'none' }} key={todo.id}>{todo.text}</Text>)}
    <Button title="Adicionar" onPress={addTodo} />
  </View>
);
// mapeia o estado global do redux
const mapStateToProps = state => ({
  todos: state,
});

const mapDispatchToProps = dispatch => bindActionCreators(TodosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
