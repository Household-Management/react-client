import {AWSError, DynamoDB} from "aws-sdk";

export function userCreation(event: any, context: any, callback: any) {
    const dynamodb = new DynamoDB();
    const params = {
      Key: {
          email: {
            S: (event.request.userAttributes.email as string),
          },
      },
      TableName: "Homeplanit-Users",
    };
    console.info("Checking if database user exists.");
    dynamodb.getItem(params, (getError: AWSError, data: AWS.DynamoDB.GetItemOutput) => {
      if (getError) {
        callback(getError);
      }
      console.info("getItem completed");
        if (!data.Item) {
          console.info("User does not exist.");
          const userCreationParams = {
            Item: {
              email: {
                S: (event.request.userAttributes.email as string),
              },
            },
            TableName: "Homeplanit-Users",
          };
            /* tslint:disable:align */
          dynamodb.putItem(userCreationParams, (putError: AWSError) => {
            if (putError) {
              callback(putError);
            } else {
              console.info("User put completed.");
            }
            callback(null, event);
          });
        } else {
            console.warn("User already existed!");
            callback(null, event);
        }
    });
}
