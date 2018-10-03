'use strict';
import AWS = require("aws-sdk");

export function saveData(data: any, context: any, callback: any) {
    try {
        const dynamodb = new AWS.DynamoDB();
        let tableName;
        switch (event.metadata.state) {
            case "staging":
                tableName = "Homeplanit-Users-Staging";
                break;
        }
    dynamodb.putItem({
        Item: AWS.DynamoDB.Converter.marshall(data),
        TableName: tableName
    }, function (error, data) {
        callback(error, JSON.stringify({
            statusCode: 200
        }));
    });
    } catch(e){
        callback(e);
    }
};
