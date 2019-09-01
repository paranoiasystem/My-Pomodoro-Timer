import React from 'react';

class Emoji extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>{this.props.emoji}</span>
        );
    }
}

export default Emoji;
