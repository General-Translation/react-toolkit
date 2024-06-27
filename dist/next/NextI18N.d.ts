import { ReactNode } from 'react';
interface NextI18NProps {
    children: ReactNode;
    [key: string]: any;
}
export default function NextI18N({ children, ...metadata }: NextI18NProps): Promise<import("react/jsx-runtime").JSX.Element>;
export {};
//# sourceMappingURL=NextI18N.d.ts.map