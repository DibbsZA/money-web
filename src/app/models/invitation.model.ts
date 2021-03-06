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
 * Object contaning so called \"connection invitation\".
 * This is a piece of data connection counterparty needs to receive in order to establish 2 way connection.
 */
export interface Invitation {
  /**
   * Invitation string which can be processes by LibVCX method Connection.createWithInvite(...)
   */
  invitationString?: string;
}

/**
 * @description Breakdown of invitationString as parsed into an object.
 * @author G de Beer
 * @date 2019-08-19
 */
export interface InvitationString {
  id: string;
  s: {
    d: string,
    dp: {
      d: string,
      k: string,
      s: string
    },
    l: string, // logo image
    n: string, // Issuer Name
    publicDID: string,
    v: string
  };
  sa: object;
  sc: string;
  sm: string;
  t: string;
  threadId: null;
}
