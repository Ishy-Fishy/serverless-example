'use strict';

import {DynamoDB} from 'aws-sdk'
import PutParam = DynamoDB.PutParam;
import ScanParam = DynamoDB.ScanParam;
import GetParam = DynamoDB.GetParam;
import DeleteParam = DynamoDB.DeleteParam;
import UpdateParam = DynamoDB.UpdateParam;

const dynamoDb = new DynamoDB.DocumentClient()

interface DyndbRetItem {
    Item: any
}

export function putAsync(params: PutParam): Promise<DyndbRetItem> {
    // write the book to the database
    return new Promise((resolve, reject) => {
        dynamoDb.put(params, (error, result) => {
                // handle potential errors
                if (error) {
                    console.error(error)
                    let err = new Error('Couldn\'t create the item.')
                    return reject(err)
                }
                resolve(result)
            }
        )
    })
}

export function updateAsync(params: UpdateParam): Promise<DyndbRetItem> {
    // write the book to the database
    return new Promise((resolve, reject) => {
        dynamoDb.update(params, (error, result) => {
                // handle potential errors
                if (error) {
                    console.error(error)
                    let err = new Error('Couldn\'t update the item.')
                    // return reject(err)
                    return reject(error)
                }
                resolve(result)
            }
        )
    })
}

export function deleteAsync(params: DeleteParam) {
    // delete book from the database
    return new Promise((resolve, reject) => {
        dynamoDb.delete(params, (error) => {
                // handle potential errors
                if (error) {
                    console.error(error)
                    let err = new Error('Couldn\'t delete the item.')
                    return reject(err)
                }
                resolve()
            }
        )
    })
}

export function getAsync(params: GetParam) {
    // get book by param
    return new Promise((resolve, reject) => {
        dynamoDb.get(params, (error, result) => {
                // handle potential errors
                if (error) {
                    console.error(error)
                    let err = new Error('Couldn\'t get the item.')
                    return reject(err)
                }
                resolve(result)
            }
        )
    })
}

export function listAsync(params: ScanParam) {
    // list all books matching param
    return new Promise((resolve, reject) => {
        dynamoDb.scan(params, (error, result) => {
                // handle potential errors
                if (error) {
                    console.error(error)
                    let err = new Error('Couldn\'t get the items.')
                    return reject(err)
                }
                resolve(result)
            }
        )
    })
}