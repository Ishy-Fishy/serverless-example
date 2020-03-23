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
const uuid = require("uuid");
const dyndb_1 = require("../util/dyndb");
module.exports.create = (event, context) => __awaiter(this, void 0, void 0, function* () {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            uuid: uuid.v1(),
            name: data.name,
            releaseDate: data.releaseDate,
            authorName: data.authorName
        }
    };
    const result = yield dyndb_1.putAsync(params);
    // create a response
    const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item)
    };
    return response;
});