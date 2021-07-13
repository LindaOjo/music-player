import React from 'react';

const Nav = ({libraryStatus, setLibraryStatus}) => {
    return (
        <nav>
            <h1>Waves</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
            </button>
        </nav>
    )
}

export default Nav;