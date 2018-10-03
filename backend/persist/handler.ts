'use strict';
import AWS = require("aws-sdk");

export function saveData(event: any, context: any, callback: any) {
    try {
        const dynamodb = new AWS.DynamoDB();
        let tableName;
        switch (event.metadata.state) {
            case "staging":
                tableName = "Homeplanit-Users-Staging";
                break;
        }
    if (!tableName) {
        return callback({
            statusCode: 500,
            message: "No table name defined for specified stage"
        })
    }
    dynamodb.putItem({
        Item: AWS.DynamoDB.Converter.marshall(Object.assign(event.data, {username: event.user})),
        TableName: tableName
    }, function (error:any, data:any) {
        callback(error, JSON.stringify({
            statusCode: 200
        }));
    });
    } catch(e){
        callback(e);
    }
};
