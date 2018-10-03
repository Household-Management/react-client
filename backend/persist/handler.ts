import {DynamoDB} from "aws-sdk";

export function saveData(event: any, context: any, callback: any) {
    try {
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
        dynamodb.putItem({
            Item: DynamoDB.Converter.marshall(Object.assign(event.data, {username: event.user})),
            TableName: tableName,
        }, (error: any) => {
            callback(error, JSON.stringify({
                statusCode: 200,
            }));
        });
    } catch (e) {
        callback(e);
    }
}
