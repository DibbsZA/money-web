/**
 * VCXS Swagger
 * VCXS - Verifiable Credential Exchange Service
 *
 * OpenAPI spec version: 1.1.5
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * Representation of message received or sent via indy channel with a connection.
 * Beware when you request messages for a connection, it also includes messages automatically
 * exchanged during connection establishment or credential exchanges.
 */
export interface Message {
  /**
   * LibVCX status code indicating status of message - whether it was yet processed or not.
   */
  statusCode?: string;
  senderDid?: string;
  /**
   * Content of the message
   */
  payload?: string;
  /**
   * Unique ID of messsage
   */
  uid?: string;
  /**
   * Type of message.
   */
  type?: string;
}
