export interface EKyc {
  /**
   * @description Full Surname of person
   */
  surname?: string;
  /**
   * @description Space delimmited list of forenames
   */
  names?: string;
  /**
   * @description Gender classification
   * @example 'M'
   */
  sex?: string;
  /**
   * @description 3 Letter country code
   * @example 'ZAF'
   */
  nationality?: string;
  /**
   * @description 13 Digit SA ID Number
   */
  identityNumber?: string;
  /**
   * @description  Date of birth - MMMM d, YYYY
   * @example July 20, 1969
   */
  dateOfBirth?: string;
  /**
   * @description 3 Letter country code
   * @example 'ZAF'
   */
  countryOfBirth?: string;
  /**
   * @description Citizen status
   * @example 'CITIZEN'
   */
  status?: string;
}

export interface EKycResidence {
  /**
   * @description Full formatted residential address
   */
  fullAddress?: string;
}

export interface EmailCred {
  /**
   * @description verified email address
   */
  email?: string;
}

export interface CellphoneCred {
  /**
   * @description Verified Full international dialing number of cellphone
   * @example +27825551234
   */
  cellphone?: string;
}
