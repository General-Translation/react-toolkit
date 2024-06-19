import React from 'react'
import NextI18N from "./NextI18N"

// <p> tag
export function P({ children, ...props }) {
    return (
        <p {...props}>
            <NextI18N>{children}</NextI18N>
        </p>
    )
}

// <h1> tag
export function H1({ children, ...props }) {
    return (
        <h1 {...props}>
            <NextI18N>{children}</NextI18N>
        </h1>
    )
}

// <h2> tag
export function H2({ children, ...props }) {
    return (
        <h2 {...props}>
            <NextI18N>{children}</NextI18N>
        </h2>
    )
}

// <h3> tag
export function H3({ children, ...props }) {
    return (
        <h3 {...props}>
            <NextI18N>{children}</NextI18N>
        </h3>
    )
}

// <h4> tag
export function H4({ children, ...props }) {
    return (
        <h4 {...props}>
            <NextI18N>{children}</NextI18N>
        </h4>
    )
}

// <h5> tag
export function H5({ children, ...props }) {
    return (
        <h5 {...props}>
            <NextI18N>{children}</NextI18N>
        </h5>
    )
}

// <h6> tag
export function H6({ children, ...props }) {
    return (
        <h6 {...props}>
            <NextI18N>{children}</NextI18N>
        </h6>
    )
}

// <ol> tag
export function OL({ children, ...props }) {
    return (
        <ol {...props}>
            <NextI18N>{children}</NextI18N>
        </ol>
    )
}

// <ul> tag
export function UL({ children, ...props }) {
    return (
        <ul {...props}>
            <NextI18N>{children}</NextI18N>
        </ul>
    )
}
