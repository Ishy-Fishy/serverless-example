'use strict'

import {listAsync, getAsync} from '../util/dyndb'

module.exports.getAll = async (event, context) => {

    const params = {TableName: process.env.DYNAMODB_TABLE};
    const result = await listAsync(params);
    // create a response
    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    }
    return response
}

module.exports.getOne = async (event, context) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            uuid: event.pathParameters.bookUuid
        }
    };
    const result = await getAsync(params);
    // create a response
    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    }
    return response
}

