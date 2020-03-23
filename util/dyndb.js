'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
function putAsync(params) {
    // write the book to the database
    return new Promise((resolve, reject) => {
        dynamoDb.put(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                let err = new Error('Couldn\'t create the item.');
                return reject(err);
            }
            resolve(result);
        });
    });
}
exports.putAsync = putAsync;
function updateAsync(params) {
    // write the book to the database
    return new Promise((resolve, reject) => {
        dynamoDb.update(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                let err = new Error('Couldn\'t update the item.');
                // return reject(err)
                return reject(error);
            }
            resolve(result);
        });
    });
}
exports.updateAsync = updateAsync;
function deleteAsync(params) {
    // delete book from the database
    return new Promise((resolve, reject) => {
        dynamoDb.delete(params, (error) => {
            // handle potential errors
            if (error) {
                console.error(error);
                let err = new Error('Couldn\'t delete the item.');
                return reject(err);
            }
            resolve();
        });
    });
}
exports.deleteAsync = deleteAsync;
function getAsync(params) {
    // get book by param
    return new Promise((resolve, reject) => {
        dynamoDb.get(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                let err = new Error('Couldn\'t get the item.');
                return reject(err);
            }
            resolve(result);
        });
    });
}
exports.getAsync = getAsync;
function listAsync(params) {
    // list all books matching param
    return new Promise((resolve, reject) => {
        dynamoDb.scan(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                let err = new Error('Couldn\'t get the items.');
                return reject(err);
            }
            resolve(result);
        });
    });
}
exports.listAsync = listAsync;
