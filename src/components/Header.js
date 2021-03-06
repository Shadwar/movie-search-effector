import React from 'react';

const Header = (props) => (
    <header className="App-header">
        <h2>{props.text}</h2>
    </header>
)

export default React.memo(Header);
