'use strict';
import AWS = require("aws-sdk");
import {AWSError} from "aws-sdk";

export function userCreation(event: any, context: any, callback: any) {
    const dynamodb = new AWS.DynamoDB();
    let params = {
      Key: {
          email: {
            S: (event.request.userAttributes.email as string)
          }
      },
        TableName: "Homeplanit-Users"
    };
    console.info("Checking if database user exists.");
    dynamodb.getItem(params, (err: AWSError, data: AWS.DynamoDB.GetItemOutput) => {
      if(err){
        console.error(err);
      }
      console.info("getItem completed");
        if (!data.Item) {
          console.info("User does not exist.");
            let userCreationParams = {
                Item: {
                    Key: {
                        S: (event.request.userAttributes.email as string)
                    }

                },
                TableName: "Homeplanit-users"
            };
            dynamodb.putItem(userCreationParams, (err) => {
              if(err){
                console.error(err);
              } else {
                console.info("User put completed.");
              }
              callback(null, event);
            })
        } else {
            console.warn("User already existed!");
            callback(null, event);
        }
    });
};
