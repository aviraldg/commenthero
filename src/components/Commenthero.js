'use strict';

import React from 'react';
import Matrix from 'matrix-js-sdk';
import Q from 'q';
import Comment from './Comment'

require('styles//Commenthero.scss');

class Commenthero extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    var client = Matrix.createClient(this.props.homeserver);
    client.registerGuest().then(data => {
      this.accessToken = data.access_token;
      this.userId = data.user_id;
      return Q.when(this.accessToken);
    }).then(accessToken => {
      window.client = client = Matrix.createClient({
        baseUrl: this.props.homeserver,
        accessToken: this.accessToken,
        userId: this.userId
      });
      client.setGuest(true);
      client.startClient();
      client.sendStateEvent('!vfFxDRtZSSdspfTSEr:matrix.org',
        'com.aviraldg.commenthero',
        {
          msgtype: 'com.aviraldg.commenthero',
          body: 'test'
        });
      client.on('event', (data) => {
        this.setState({
          comments: this.state.comments.concat([data])
        });
      });
      client.joinRoom('#test:matrix.org');
      return Q.defer();
    });
  }


  render() {
    var comments = [];
    var length = this.state.comments.length;
    for (var i = length - 1; i >= 0; i--) {
      var comment = this.state.comments[i];

      if(comment.getType() !== 'm.room.message') continue;

      comments.push(
        <Comment key={ comment.getId() } comment={ comment }></Comment>
      );
    }
    // console.log(comments);
    return (
      <div className="ch-commenthero">
        { comments }
      </div>
    );
  }
}

Commenthero.displayName = 'Commenthero';

// Uncomment properties you need
Commenthero.propTypes = {
  homeserver: React.PropTypes.string,
  targetUrl: React.PropTypes.string
};
Commenthero.defaultProps = {
  homeserver: 'http://matrix.org',
  targetUrl: ''
};

export default Commenthero;
