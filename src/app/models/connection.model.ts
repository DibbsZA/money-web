/**
 * VCXS Swagger
 * VCXS - Verifiable Credential Exchange Service
 *
 * OpenAPI spec version: 1.0.0-oas3
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface Connection {
  /**
   * Connection id.
   */
  id?: string;
  /**
   * Pairwise did to identify this connection in wallet
   */
  pwDid?: string;
  /**
   * Our public key used for this relationship.
   */
  pwVerkey?: string;
  /**
   * The pairwise did the counterparty declared as what they use to identify this relationship.
   */
  theirPwDid?: string;
  /**
   * Public key of counterparty.
   */
  theirPwVerkey?: string;
  /**
   * Our DID in cloud agent for this relationship
   */
  agentDid?: string;
  /**
   * State of connection. 2=init, 3=some-inter-step, 4=connection accepted
   */
  state?: number;
}