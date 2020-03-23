'use strict'

import * as uuid from 'uuid'

import {putAsync} from "../util/dyndb";

module.exports.create = async (event, context) => {
    const data = JSON.parse(event.body)

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            uuid: uuid.v1(),
            name: data.name,
            releaseDate: data.releaseDate,
            authorName: data.authorName
        }
    }

    const result = await putAsync(params);
    // create a response
    const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item)
    }
    return response

}