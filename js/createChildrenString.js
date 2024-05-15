import React from 'react';

export default function createChildrenString(children) {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        const { type, props } = child;
        let currentChildren = '';
        if (props.i18n !== "false") {
            Object.entries(props)
            .map(([key, value]) => {
                if (key === 'children') {
                    currentChildren += createChildrenString(value);
                    return ''
                }
            })
            .join('');
        }
        return `<${type.displayName || type.name || type}>${currentChildren}</${type.displayName || type.name || type}>`;
      }
      return child?.toString() || '';
    }).join('');
}