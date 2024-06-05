import React from 'react'
import NextI18N from "./NextI18N"

// <p> tag
export function Paragraph({ children, ...props }) {
    return (
        <p {...props}>
            <NextI18N>{children}</NextI18N>
        </p>
    )
}