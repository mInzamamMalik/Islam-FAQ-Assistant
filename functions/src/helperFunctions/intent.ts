import * as functions from 'firebase-functions'
import * as request from 'request'


export interface userSay {
    "count": number,
    "data": object[]
}
export interface affectedContext {
    lifespan: number,
    name: String,
    parameters: Object
}

export interface message {
    platform: String,
    textToSpeech: String,
    type: String
}

export interface parameter {
    dataType:String,
    isList: Boolean,
    name: String,
    prompts: String[],
    required: Boolean,
    value: String
}
export interface response {
    action: string,
    affectedContexts: affectedContext[],
    defaultResponsePlatforms: Object,
    messages: message[],
    parameters: parameter[],
    resetContexts: boolean
}
let access_token = "Bearer 3065ceaaf2f24c1cb51dbad1987b1a01"

export function createIntent(name: string, userSays: userSay[], responses: response[], contexts: string[] = [], templates:String[] = [], events: any[] = [], fallbackIntent: boolean = false, webhookForSlotFilling: boolean = false, webhookUsed: boolean = false) {
    console.log('helper function called->name,userSays,responses', name, userSays,responses);
    return new Promise((resolve, reject) => {
        // adding all organizations in apiai userEntity
        request.post({
            url: "https://api.dialogflow.com/v1/intents?v=20150910",
            headers: {
                "Authorization": access_token
            },
            json: {
                "contexts": contexts,
                "events": events,
                "fallbackIntent": fallbackIntent,
                "name": name,
                "priority": 500000,
                "responses": responses,
                "templates": templates,
                "userSays": userSays,
                "webhookForSlotFilling": webhookForSlotFilling,
                "webhookUsed": webhookUsed
              }
        }, (error: any, response: any, body: any) => {
            console.log(`on ${access_token} making intent ${name} -> response: `, response.body);
            //checking if response was success
            if (!error && response.statusCode == 200) {
                resolve(response.body);
            } else {
                // console.log("error in making user /entity: ", response.statusCode, error);
                reject(error)
            }
        })
    })
}