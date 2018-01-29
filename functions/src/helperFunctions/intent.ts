import * as functions from 'firebase-functions'
import * as request from 'request'
let access_token = "Bearer 3065ceaaf2f24c1cb51dbad1987b1a01"

export interface userSay {
    "count": number,
    "data": object[]
}

export interface response {
    action:string,
    affectedContexts:any[],
    defaultResponsePlatforms:Object,
    messages: Object[],
    parameters:Object[],
    resetContexts:boolean
} 

export function createIntent(name:string, userSays:userSay[],responses:response[], events:any[], fallbackIntent:boolean = false, webhookForSlotFilling:boolean = false, webhookUsed:boolean = false, contexts:string[] = [] ) {

}