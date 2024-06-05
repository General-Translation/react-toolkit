import * as React from 'react'

// source and target are both initially single objects
export default function renderChildren(source, target) {

    if (!target) return source;

    return target.map((targetChild, index) => {
        if (typeof targetChild === 'string') {
            return <React.Fragment key={index}>{targetChild}</React.Fragment>;
        }
        else {
            let matchingSource = source.find(component => (typeof component?.props?.generaltranslation === 'number') && (component?.props?.generaltranslation === targetChild?.props?.generaltranslation));
            if (!matchingSource) {
                const matchIndex = source.findIndex(component => 
                    typeof component === 'object' && typeof component?.props?.generaltranslation !== 'number'
                );
                if (matchIndex !== -1) {
                    matchingSource = source[matchIndex];
                    source.splice(matchIndex, 1);
                }
            }
            if (React.isValidElement(matchingSource)) {
                if (matchingSource.props.children && targetChild.props.children) {
                    return React.cloneElement(matchingSource, {
                        ...matchingSource.props,
                        children: renderChildren(matchingSource.props.children, targetChild.props.children)
                    });
                }
                return matchingSource;
            }
        }
    })

}