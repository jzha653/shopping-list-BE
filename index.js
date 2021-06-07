const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "accept, origin, content-type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
    };

    try {
        switch (event.routeKey) {
            case "DELETE /items/{id}":
                await dynamo
                    .delete({
                        TableName: "shopping-list-items",
                        Key: {
                            id: event.pathParameters.id,
                        }
                    })
                    .promise();
                body = `Deleted item ${event.pathParameters.id}`;
                break;
            case "GET /items/{id}":
                body = await dynamo
                    .get({
                        TableName: "shopping-list-items",
                        Key: {
                            id: event.pathParameters.id
                        }
                    })
                    .promise();
                break;
            case "GET /items":
                body = await dynamo.scan({ TableName: "shopping-list-items" }).promise();
                break;
            case "PUT /items/{id}":
                let requestJSON = JSON.parse(event.body);
                await dynamo
                    .put({
                        TableName: "shopping-list-items",
                        Item: {
                            id: event.pathParameters.id,
                            name: requestJSON.name,
                            quantity: requestJSON.quantity,
                            last_updated: new Date(Date.now()).toString()
                        }
                    })
                    .promise();
                body = `Put item ${requestJSON.name}`;
                break;
            case "POST /items":
                let request = JSON.parse(event.body);
            
                await dynamo
                    .put({
                        TableName: "shopping-list-items",
                        Item: {
                            id: uuidv4(),
                            name: request.name,
                            quantity: request.quantity,
                            last_updated: new Date(Date.now()).toString()
                        }
                    }).promise();
                body = `Post item`;
                break;

            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };
};
