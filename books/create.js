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
function validate(data) {
    const defaultMsg = 'Couldn\'t create the book item.';
    if (typeof data.name !== 'string') {
        console.error('Name Validation Failed');
        throw new Error('Invalid book name.');
    }
    if (Number.isNaN(Date.parse(data.releaseDate))) {
        console.error('Validation Failed');
        throw new Error('Invalid Date');
    }
    if (typeof data.authorName !== 'string') {
        console.error('Validation Failed');
        throw new Error('Invalid author name');
    }
    return data;
}
module.exports.create = (event, context) => __awaiter(this, void 0, void 0, function* () {
    throw new Error(`Body: ${JSON.stringify(event.body)}`);
    // const data = JSON.parse(event.body)
    // console.log(event);
    // const data = validate(event.body);
    // const params = {
    //     TableName: process.env.DYNAMODB_TABLE,
    //     Item: {
    //         uuid: uuid.v1(),
    //         name: data.name,
    //         releaseDate: Date.parse(data.releaseDate),
    //         authorName: data.authorName
    //     }
    // }
    //
    // const result = await putAsync(params);
    // // create a response
    // const response = {
    //     statusCode: 200,
    //     body: JSON.stringify(result.Item)
    // }
    // return response
    return "";
});
