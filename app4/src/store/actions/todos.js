export const addTodo = () => ({
  type: 'ADD_TODO',
  payload: {
    text: 'Text 1',
  },
});

export const markAsCompleted = id => ({
  type: 'MARK_AS_COMPLETE',
  payload: {
    id,
  },
});
