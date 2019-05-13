const INITIAL_STATE = [
  { id: 1, text: '10', completed: true },
  { id: 2, text: '20', completed: false },
];

export default function todos(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
    case 'ADD_TODO':
      return [...state,
        { id: Math.random(), text: action.payload.text, completed: false },
      ];
    case 'MARK_AS_COMPLETE':
      return state.map(todo => (todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo));
    default:
      return state;
  }
}
