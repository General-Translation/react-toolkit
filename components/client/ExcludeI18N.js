export default function ExcludeI18N({ children, i18nHint = '{variable}' }) {
    return (
        <span i18n="false" i18nhint={i18nHint}>
            {children}
        </span>
    );
}
