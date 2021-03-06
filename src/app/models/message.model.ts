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
  payload?: MessagePayload;
  /**
   * Unique ID of messsage
   */
  uid?: string;
  /**
   * Type of message.
   */
  type?: string;
}

export interface MessagePayload {
  '@type': MessagePayloadType;
  '@msg': string;
}

interface MessagePayloadType {
  name: string;
  ver: string;
  fmt: string;
}

export interface MessagePayloadMsg {
  version: string;
  to_did: string;
  from_did: string;
  proof_request_id: string;
  libindy_proof: string;
}

export interface LibindyProof {
  proof: object;
  requested_proof: RequestedProof;
  identifiers: [object];
}

interface RequestedProof {
  revealed_attrs: [SubProof];
  self_attested_attrs: [SubProof?];
  unrevealed_attrs: [object];
  predicates: object;
}

interface SubProof {
  sub_proof_index: number;
  raw: string;
  encoded: string;
}
