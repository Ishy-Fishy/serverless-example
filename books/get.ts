'use strict'

import * as uuid from 'uuid'

import {listAsync} from '../util/dyndb'

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

