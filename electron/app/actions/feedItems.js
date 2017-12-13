export function addFeedItem(payload) {
  return {
    type: 'ADD_FEED_ITEM',
    payload: {
      id: payload.Id__c,
      body: payload.Body__c,
    },
  };
}
