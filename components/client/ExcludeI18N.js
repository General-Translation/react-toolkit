export default function ExcludeI18N({ children, placeholder = '{variable}' }) {
    return (
        <span i18n="false" placeholder={placeholder}>
            {children}
        </span>
    );
}
