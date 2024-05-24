import React from 'react'

const ExcludeI18N = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
}

ExcludeI18N.markedForExclude = true;

export default ExcludeI18N;