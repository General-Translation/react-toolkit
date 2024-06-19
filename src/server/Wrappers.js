import React from 'react';
import ServerI18N from "./ServerI18N";

// <p> tag
export function P({ children, userLanguage, ...props }) {
    return (
        <p {...props}>
            <ServerI18N userLanguage={userLanguage}>
                {children}
            </ServerI18N>
        </p>
    );
}

// <h1> tag
export function H1({ children, userLanguage, ...props }) {
    return (
        <h1 {...props}>
            <ServerI18N userLanguage={userLanguage}>
                {children}
            </ServerI18N>
        </h1>
    );
}

// <h2> tag
export function H2({ children, userLanguage, ...props }) {
    return (
        <h2 {...props}>
            <ServerI18N userLanguage={userLanguage}>
                {children}
            </ServerI18N>
        </h2>
    );
}

// <h3> tag
export function H3({ children, userLanguage, ...props }) {
    return (
        <h3 {...props}>
            <ServerI18N userLanguage={userLanguage}>
                {children}
            </ServerI18N>
        </h3>
    );
}

// <h4> tag
export function H4({ children, userLanguage, ...props }) {
    return (
        <h4 {...props}>
            <ServerI18N userLanguage={userLanguage}>
                {children}
            </ServerI18N>
        </h4>
    );
}

// <h5> tag
export function H5({ children, userLanguage, ...props }) {
    return (
        <h5 {...props}>
            <ServerI18N userLanguage={userLanguage}>
                {children}
            </ServerI18N>
        </h5>
    );
}

// <h6> tag
export function H6({ children, userLanguage, ...props }) {
    return (
        <h6 {...props}>
            <ServerI18N userLanguage={userLanguage}>
                {children}
            </ServerI18N>
        </h6>
    );
}

// <ol> tag
export function OL({ children, userLanguage, ...props }) {
    return (
        <ol {...props}>
            <ServerI18N userLanguage={userLanguage}>
                {children}
            </ServerI18N>
        </ol>
    );
}

// <ul> tag
export function UL({ children, userLanguage, ...props }) {
    return (
        <ul {...props}>
            <ServerI18N userLanguage={userLanguage}>
                {children}
            </ServerI18N>
        </ul>
    );
}
