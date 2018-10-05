import {AWSError, DynamoDB} from "aws-sdk";

export function userCreation(event: any, context: any, callback: any) {
    const dynamodb = new DynamoDB();
    let tableName;
    switch (event.metadata.state) {
      case "staging":
        tableName = "Homeplanit-Users-Staging";
        break;
    }
    if (!tableName) {
        return callback({
            message: "No table name defined for specified stage",
            statusCode: 500,
        });
    }
    const params = {
      Key: {
          email: {
            S: (event.request.userAttributes.email as string),
          },
      },
      TableName: tableName
    };
    console.info("Checking if database user exists.");
    dynamodb.getItem(params, (getError: AWSError, data: AWS.DynamoDB.GetItemOutput) => {
      console.info("getItem completed");
      callback(getError, data);
    });
}
