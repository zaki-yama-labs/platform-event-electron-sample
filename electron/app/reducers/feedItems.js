export default function feedItemsReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_FEED_ITEM':
      return [action.payload, ...state];
    default:
      return state;
  }
}
