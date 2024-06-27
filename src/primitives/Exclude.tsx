import React, { ReactNode } from 'react'

interface ExcludeProps {
    children?: ReactNode,
    label?: string
}

const Exclude = ({ children, label = '' }: ExcludeProps) => {
    return (
        <span>{children}</span>
    )
}

Exclude.transformationGT = "exclude";

export default Exclude;