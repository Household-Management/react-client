import {AWSError, DynamoDB} from "aws-sdk";

export function retrieve(event: any, context: any, callback: any) {
    const dynamodb = new DynamoDB();
    let tableName;
    switch (event.metadata.stage) {
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
          username: {
            S: (event.user as string),
          },
      },
      TableName: tableName
    };
    console.info("Checking if database user exists.");
    dynamodb.getItem(params, (getError: AWSError, data: AWS.DynamoDB.GetItemOutput) => {
      callback(getError, getError ? null : DynamoDB.Converter.unmarshall(data.Item!));
    });
}
