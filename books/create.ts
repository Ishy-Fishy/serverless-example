'use strict'

import * as uuid from 'uuid'

import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient()

function validate(data) {
  const defaultMsg = 'Couldn\'t create the book item.';
  if (typeof data.name !== 'string') {
    console.error('Name Validation Failed')
    throw new Error('Invalid Name.')
  }
  if (typeof data.releaseDate !== 'number') {
    console.error('Validation Failed')
    throw new Error('Couldn\'t create the book item.')
  }
  if (typeof data.authorName !== 'string') {
    console.error('Validation Failed')
    throw new Error('Couldn\'t create the book item.')
  }
}

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime()
      const data = JSON.parse(event.body)
  //
  //     const params = {
  //       TableName: process.env.DYNAMODB_TABLE,
  //       Item: {
  //         id: uuid.v1(),
  //         text: data.text,
  //         checked: false,
  //         createdAt: timestamp,
  //         updatedAt: timestamp
  //       }
  //     }
  //
  //     // write the todo to the database
  //     dynamoDb.put(params, (error, result) => {
  //       // handle potential errors
  //       if (error) {
  //         console.error(error)
  //         callback(new Error('Couldn\'t create the todo item.'))
  //         return
  //       }
  //
        // create a response
        const response = {
          statusCode: 200,
          body: JSON.stringify(result.Item)
        }
        return response
  //       callback(null, response)
  //     })

}