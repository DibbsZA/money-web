export interface CreateCredential {
  /**
   * id of credential definition the credential should be built on top of
   */
  credDefId?: string;
  /**
   * name of issued credential
   */
  credentialName?: string;
  /**
   * key:value object where key is name of credential field and value is the assigned value in issued credential
   */
  values?: any;
}
