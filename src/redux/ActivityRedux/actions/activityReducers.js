export default (state, action) => {
  if (typeof state === 'undefined') {
    return {};
  }

  switch (action.type) {
    case 'LOAD_ACTIVITIES':
      return {
        ...state,
        activities: action.updatePayload 
      };

    case 'ADD_ACTIVITY': 
      return {
        ...state,
        activities: [ action.updatePayload, ...state.activities]
      };

    case 'UPDATE_ACTIVITY': 
      return {
        ...state,
        activities: state.activities.map(a =>
          a.id === action.updatePayload.id ? action.updatePayload : a
        )
      };

    case 'DELETE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.filter(a => a.id !== action.updatePayload)
      };

    case 'LOAD_ACTIVITIES_FAILED':
    case 'ADD_ACTIVITY_FAILED':
    case 'UPDATE_ACTIVITY_FAILED':
    case 'DELETE_ACTIVITY_FAILED':
      return {
        ...state,
        error: action.updatePayload
      };

    default:
      return state;
  }
};  