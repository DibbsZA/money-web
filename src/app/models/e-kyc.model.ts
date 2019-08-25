
/**
 * @description Schema of eKYC credential
 * @author G de Beer
 * @date 2019-08-19
 */
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

export interface KycNamesCred {
  names?: string;
}

export interface KycSurnameCred {
  surname?: string;
}

export interface KycSexCred {
  sex?: string;
}

export interface KycNationalityCred {
  nationality?: string;
}

export interface KycIdentityNumberCred {
  identityNumber?: string;
}

export interface KycDateOfBirthCred {
  dateOfBirth?: string;
}

export interface KycNamesCred {
  names?: string;
}

export interface KycCountryOfBirthCred {
  countryOfBirth?: string;
}

export interface KycStatusCred {
  status?: string;
}


export interface KycResidence {
  /**
   * @description Full formatted residential address
   */
  fullAddress?: string;
}

export interface CredEmail {
  /**
   * @description verified email address
   */
  email?: string;
}

export interface CredCellphone {
  /**
   * @description Verified Full international dialing number of cellphone
   * @example +27825551234
   */
  cellphone?: string;
}
