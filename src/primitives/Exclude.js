import * as React from 'react'

const Exclude = ({ children, label = '' }) => {
    return (
        <span>{children}</span>
    )
}

Exclude.markedForExclude = true;

export default Exclude;