import React, { ReactNode } from 'react';
type Child = ReactNode | Record<string, any>;
type Children = Child[] | Child;
export default function addGTIdentifier(children: Children): string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined)[] | undefined;
export {};
//# sourceMappingURL=addGTIdentifier.d.ts.map