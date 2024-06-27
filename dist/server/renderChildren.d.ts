import { ReactNode } from 'react';
type TargetElement = Record<string, any>;
type TargetChild = TargetElement | string;
type Target = TargetChild | TargetChild[];
export default function renderChildren(source: ReactNode, target?: Target | null): Promise<ReactNode>;
export {};
//# sourceMappingURL=renderChildren.d.ts.map