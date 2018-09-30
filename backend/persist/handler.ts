'use strict';
import AWS = require("aws-sdk");
import {AWSError} from "aws-sdk";

export function saveData(event: any, context: any, callback: any) {
    const dynamodb = new AWS.DynamoDB();
    dynamodb.putItem({
      Item: event.request.
    });
};
