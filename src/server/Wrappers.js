import React from 'react';
import ServerI18N from "./ServerI18N";

// <p> tag
export function Paragraph({ children, userLanguage, ...props }) {
    return (
        <ServerI18N userLanguage={userLanguage} {...props}>
            <p {...props}>{children}</p>
        </ServerI18N>
    );
}