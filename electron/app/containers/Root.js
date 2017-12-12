import { connect } from 'react-redux';
import Root from '../components/Root';
import { addFeedItem } from '../actions/feedItems';

import jsforce from 'jsforce';
import lib from 'cometd';
const cometd = new lib.CometD();

const mapStateToProps = (state) => {
  return state;
};

const USERNAME = 'username';
const PASSWORD = 'password';

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: () => {
      const conn = new jsforce.Connection();
      conn.login(USERNAME, PASSWORD, (err, userInfo) => {
        cometd.configure({
          url: `${conn.instanceUrl}/cometd/41.0`,
          requestHeaders: { Authorization: `OAuth ${conn.accessToken}` },
          appendMessageTypeToURL: false,
        });
        cometd.websocketEnabled = false;

        cometd.handshake((handshakeReply) => {
          if (handshakeReply.successful) {
            console.log('Connected to CometD.');
            // Subscribe to platform event
            const newSubscription = cometd.subscribe('/event/FeedItemPosted__e',
              (platformEvent) => {
                console.log('Platform event received: '+ (platformEvent.data.payload));
                dispatch(addFeedItem(platformEvent.data.payload));
              }
            );
          } else {
            console.error('Failed to connected to CometD.');
          }
        });
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
