import { ReactNode } from 'react';
interface ServerI18NProps {
    children: ReactNode;
    userLanguage: string;
    metadata: Record<string, any>;
    [key: string]: any;
}
export default function ServerI18N({ children, userLanguage, ...metadata }: ServerI18NProps): Promise<import("react/jsx-runtime").JSX.Element>;
export {};
//# sourceMappingURL=ServerI18N.d.ts.map