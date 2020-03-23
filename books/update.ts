'use strict'

import {updateAsync} from '../util/dyndb'

function validate(data) {
    if (data.name && typeof data.name !== 'string') {
        console.error('Name Validation Failed')
        throw new Error('Invalid book name.')
    }
    if (data.releaseDate && Number.isNaN(Date.parse(data.releaseDate))) {
        console.error('Validation Failed')
        throw new Error('Invalid Date')
    }
    if (data.authorName && typeof data.authorName !== 'string') {
        console.error('Validation Failed')
        throw new Error('Invalid author name')
    }
    return data;
}

module.exports.update = async (event, context) => {
    const parsed = JSON.parse(event.body);
    const data = validate(parsed);
    const item = {
        name: data.name,
        releaseDate: Date.parse(data.releaseDate),
        authorName: data.authorName
    };

    let updateExprVariables = '';

    const ExpressionAttributeValues = {}

    const ExpressionAttributeNames = {}

    for (let key in item) {
        if (item[key]) {
            //obviously ternary operators are bad, but making a dictionary for just one reserved word is overkill
            updateExprVariables += ` ${key === 'name' ? "#nm" : key} = :${key},`;
            ExpressionAttributeValues[`:${key}`] = item[key];
            if (key === 'name') {
                ExpressionAttributeNames['#nm'] = 'name'
            }
        }
    }
    //remove trailing comma
    updateExprVariables = updateExprVariables.replace(/,\s*$/, "");

    if (!updateExprVariables) {
        return {
            statusCode: 200
        }
    }
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            uuid: event.pathParameters.bookUuid
        },
        //its 2020, and DynamoDB updates with interpreted string commands instead of a JSON... Couldn't the sdk at least wrap this ugliness?
        UpdateExpression: `set ${updateExprVariables}`,
        ExpressionAttributeValues: ExpressionAttributeValues,
        ExpressionAttributeNames: ExpressionAttributeNames
    }
    //
    const result = await updateAsync(params);
    // create a response
    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    }
    return response
}