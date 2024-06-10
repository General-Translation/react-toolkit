import * as React from 'react'

// source and target are both arrays of children, even single children
export default function renderChildren(source, target) {

    if (!target) return source;
    
    // catch complex components which lose their added props
    const complex = source.filter(child => {
        if (child && typeof child !== 'string' && child?.props && !child?.props?.generaltranslation) {
            return child;
        }
    })

    return target.map((targetChild, index) => {
        if (typeof targetChild === 'string') {
            return <React.Fragment key={index}>{targetChild}</React.Fragment>;
        }
        else {
            const matchingSource = source.find(component => (typeof component?.props?.generaltranslation === 'number') && (component?.props?.generaltranslation === targetChild?.props?.generaltranslation));
            if (React.isValidElement(matchingSource)) {
                if (matchingSource.props.children && targetChild.props.children) {
                    return React.cloneElement(matchingSource, {
                        ...matchingSource.props,
                        children: renderChildren(matchingSource.props.children, targetChild.props.children)
                    });
                }
                return matchingSource;
            } else if (complex.length > 0) {
                return complex.shift()
            }
        }
    })

}