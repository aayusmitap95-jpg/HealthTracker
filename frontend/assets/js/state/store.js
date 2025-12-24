// Global app state
let state = {
  editingId: null, // which user is being edited
  // users: [],
  activities: [],     
  medical: []        
};

// Update state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read state
export function getState() {
  return state;
}
