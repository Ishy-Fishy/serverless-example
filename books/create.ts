'use strict'

import * as uuid from 'uuid'

import {putAsync} from '../util/dyndb'

function validate(data) {
    const defaultMsg = 'Couldn\'t create the book item.';
    if (typeof data.name !== 'string') {
        console.error('Name Validation Failed')
        throw new Error('Invalid Name.')
    }
    if (Number.isNaN(Date.parse(data.releaseDate))) {
        console.error('Validation Failed')
        throw new Error('Couldn\'t create the book item.')
    }
    if (typeof data.authorName !== 'string') {
        console.error('Validation Failed')
        throw new Error('Couldn\'t create the book item.')
    }
    return data;
}

module.exports.create = async (event, context) => {
    // const data = JSON.parse(event.body)
    console.log(event);
    const data = validate(event.body);

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
        body: JSON.stringify(result.Item)
    }
    return response

}