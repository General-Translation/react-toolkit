import { ReactNode } from 'react';
type TargetElement = Record<string, any>;
type TargetChild = TargetElement | string;
type Target = TargetChild | TargetChild[];
export default function renderResolvedChildren(source: ReactNode, target?: Target | null): ReactNode;
export {};
//# sourceMappingURL=renderResolvedChildren.d.ts.map