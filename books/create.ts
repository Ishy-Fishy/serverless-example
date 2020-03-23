'use strict'

import * as uuid from 'uuid'

import {putAsync} from '../util/dyndb'

function validate(data) {
    if (typeof data.name !== 'string') {
        console.error('Name Validation Failed')
        throw new Error('Invalid book name.')
    }
    if (Number.isNaN(Date.parse(data.releaseDate))) {
        console.error('Validation Failed')
        throw new Error('Invalid Date')
    }
    if (typeof data.authorName !== 'string') {
        console.error('Validation Failed')
        throw new Error('Invalid author name')
    }
    return data;
}

module.exports.create = async (event, context) => {
    const parsed = JSON.parse(event.body);
    const data = validate(parsed);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            uuid: uuid.v1(),
            name: data.name,
            releaseDate: Date.parse(data.releaseDate),
            authorName: data.authorName
        }
    }

    const result = await putAsync(params);
    // create a response
    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    }
    return response
}