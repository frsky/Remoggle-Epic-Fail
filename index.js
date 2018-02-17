/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * Epic Fail v1.0 -- an Alexa fanfare for failure
 * By F. Sikernitsky, Feburary 2018
 * 
 *   - Just plays a sad trombone. 
 * 
 * 
 *      Version 1.00 - 16-Feb 2018
 *          - Initial Version
 * 
 **/

'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined; 
const sadUrl= 'https://s3.amazonaws.com/cdn.remoggle.com/assets/sadbone2.mp3';
const moment = '<break time="600ms"/>';
const varyBye = ['Talk to ya later.','Bye for now.','Bye-bye!','Goodbye!'];

function sayBye() {
    return varyBye[Math.floor(Math.random() * varyBye.length)];
}

const handlers = {  // Handle initial stateless intents
    'LaunchRequest': function() {

        const speechOutput = "<audio src='" + sadUrl + "' /> " ;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'doEpicFail': function() {
        const speechOutput = "Epic Fail is epic." 
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function() {
        const speechOutput = "Epic Fail is epic." 
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function() {
        console.log('AMAZON.CancelIntent');
        this.emit(':tell', sayBye());
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', sayBye());
    },
    'SessionEndedRequest': function() {
        console.log('session ended on User Quit');
    }
};

exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = process.env.APP_ID; // alexa skill id
    alexa.registerHandlers(handlers); // Add Handlers for ASK and WORD states.
    alexa.execute();
};