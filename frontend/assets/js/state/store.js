// Global app state
let state = {
  editingId: null, // which user is being edited
  users: []        // list of all users
};

// Update state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read state
export function getState() {
  return state;
}
