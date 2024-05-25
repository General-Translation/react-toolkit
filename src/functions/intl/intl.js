'use server'

import I18NConfig from "../../config/I18NConfig";

// takes a string or an array of strings
export default async function intl(input, userLanguage) {
    async function translateThis(string) {
        if (typeof string !== 'string') return string;
        return await I18NConfig.translateString({string, userLanguage})
    }
    if (Array.isArray(input)) {
        return await Promise.all(input.map(async item => await translateThis(item)))
    } 
    else return await translateThis(input);
}