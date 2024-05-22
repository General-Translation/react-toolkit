'use server'

import GT from "generaltranslation";
import defaultTranslationManager, { TranslationManager } from "./TranslationManager";

// takes a string or an array of strings
export async function intl(input, language, translationManager) {

    if (!translationManager) translationManager = defaultTranslationManager;

    async function translateThis(string) {
        if (typeof string !== 'string') return string;
        return await translationManager.translate({string, language})
    }
    if (Array.isArray(input)) {
        return await Promise.all(input.map(async item => await translateThis(item)))
    } else return await translateThis(input);
    
}

export function createINTLFunction({ gt, ...options }) {
    const translationManager = new TranslationManager({ gt: (gt ? gt : new GT()), ...options });
    return (input) => {
        translate(input, translationManager)
    };
}