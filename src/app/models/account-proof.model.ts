
/**
 * @description Schema of ProofOfAccount credential
 * @author G de Beer
 * @date 2019-08-19
 */
export interface AccountProof {
  /**
   * Full Bank Name
   */
  bank?: string;
  /**
   * Account Holder Initals and Name (Upper Case)
   * @example H.M. ACCOUNT
   */
  accountHolder?: string;
  /**
   * Typ of transactional account: CHEQUE, SAVINGS, TRANSMISSION, ?
   * @example CHEQUE
   */
  accountType?: string;
  /**
   * Account Number (up to 13 Characters in SA)
   */
  accountNo?: string;
  /**
   * Branch Routing number
   *
   */
  branchCode?: string;
  /**
   * Date on which the account was opened in string format
   * @example '20190921'
   */
  openDate?: string;

}
