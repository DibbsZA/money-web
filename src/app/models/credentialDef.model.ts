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

export interface CredentialDef {
  /**
   * Id of Credential Definition as VCXR REST Resource.
   */
  id?: string;
  /**
   * Id of credential definition on the ledger (txnMetadata.txnId)
   */
  credDefLedgerId?: string;
  /**
   * The DID which own the credential definition. (Also part of credDefLedgerId)
   */
  issuerDid?: string;
  /**
   * Name given to credential definition (TODO Findut: Is this somehow encoded on ledger?)
   */
  credDefName?: string;
  /**
   * Indicates whether credentials built on top of it can be revoked.
   */
  revokable?: boolean;
}
