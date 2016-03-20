'use strict';

import React from 'react';
import marked from 'marked';

require('styles//Comment.scss');

class Comment extends React.Component {
  render() {
    var htmlContent = {
      __html: marked(this.props.comment.getContent().body)
    };

    return (
      <div className="ch-comment">
        <div className="ch-avatar">{ this.props.comment.getSender() }</div>
        <div className="ch-content" dangerouslySetInnerHTML={ htmlContent }>
        </div>
      </div>
    );
  }
}

Comment.displayName = 'Comment';

// Uncomment properties you need
// Comment.propTypes = {};
// Comment.defaultProps = {};

export default Comment;
