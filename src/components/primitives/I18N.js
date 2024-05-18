import React from 'react'

const I18N = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
}

I18N.markedForI18N = true;

export default I18N;