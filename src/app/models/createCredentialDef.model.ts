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
 * Object specifying what credential definition should be created, on top of which schema.
 */
export interface CreateCredentialDef {
  /**
   * VCXS (REST) ID of Schema to build Credential Definition on top of.
   */
  schemaId?: string;
  /**
   * Name given to credential definitioon.
   */
  credDefName?: string;
}
