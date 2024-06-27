import React, { ReactNode } from 'react';
type Children = ReactNode;
export default function writeChildrenAsObjects(children: Children): string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | {
    type: string;
    props: any;
} | (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | {
    type: string;
    props: any;
} | null | undefined)[] | null | undefined;
export {};
//# sourceMappingURL=writeChildrenAsObjects.d.ts.map