export default function getDefaultFromEnv(VARIABLE: string): string {
    if (typeof process !== 'undefined' && process?.env?.[VARIABLE]) {
        return process.env[VARIABLE] as string;
    }
    return '';
}