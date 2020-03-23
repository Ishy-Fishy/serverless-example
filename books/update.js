'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dyndb_1 = require("../util/dyndb");
function validate(data) {
    if (data.name && typeof data.name !== 'string') {
        console.error('Name Validation Failed');
        throw new Error('Invalid book name.');
    }
    if (data.releaseDate && Number.isNaN(Date.parse(data.releaseDate))) {
        console.error('Validation Failed');
        throw new Error('Invalid Date');
    }
    if (data.authorName && typeof data.authorName !== 'string') {
        console.error('Validation Failed');
        throw new Error('Invalid author name');
    }
    return data;
}
module.exports.update = (event, context) => __awaiter(this, void 0, void 0, function* () {
    const parsed = JSON.parse(event.body);
    const data = validate(parsed);
    const item = {
        name: data.name,
        releaseDate: Date.parse(data.releaseDate),
        authorName: data.authorName
    };
    const updateParams = dyndb_1.generateUpdateParametersFromObject(item);
    if (!updateParams.expressionString) {
        return {
            statusCode: 200
        };
    }
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            uuid: event.pathParameters.bookUuid
        },
        //its 2020, and DynamoDB updates with interpreted string commands instead of a JSON... Couldn't the sdk at least wrap this ugliness?
        UpdateExpression: `set ${updateParams.expressionString}`,
        ExpressionAttributeValues: updateParams.attributeValues,
        ExpressionAttributeNames: updateParams.attributeNames
    };
    const result = yield dyndb_1.updateAsync(params);
    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    };
    return response;
});
