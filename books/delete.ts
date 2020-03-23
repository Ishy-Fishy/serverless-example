'use strict'

import {deleteAsync} from "../util/dyndb";

module.exports.delete = async (event, context) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            uuid: event.pathParameters.bookUuid
        }
    }
    await deleteAsync(params);
    return {
        statusCode: 200
    }
}