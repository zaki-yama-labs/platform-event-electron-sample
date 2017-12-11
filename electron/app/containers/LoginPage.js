import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/Login';
import userActions from '../actions/user';

import jsforce from 'jsforce';
import lib from 'cometd';
const cometd = new lib.CometD();

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  const user = bindActionCreators(userActions, dispatch);
  const conn = new jsforce.Connection();
  const username = 'xxx';
  const password = 'xxx';
  conn.login(
    username,
    password,
    (err, userInfo) => {
      console.log(err);
      console.log(conn.accessToken);
      console.log(cometd);
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
            function(platformEvent) {
              console.log('Platform event received: '+ (platformEvent.data.payload.Body__c));
              // helper.onReceiveNotification(component, platformEvent);
            }
          );
          // Save subscription for later
          // var subscriptions = component.get('v.cometdSubscriptions');
          // subscriptions.push(newSubscription);
          // component.set('v.cometdSubscriptions', subscriptions);
        } else {
          console.error('Failed to connected to CometD.');
        }
      });
    });
  return {
    onLogin: (data) => {
      user.login(data);
      dispatch(push('/loggedin'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
