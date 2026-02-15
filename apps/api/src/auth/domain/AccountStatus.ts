export class AccountStatus {
  /**
   * Checks if user has completed registration process and has an account in our database
   * @param userClaims user object from firebase
   * @returns true if user has id (internal) in claims, which means that they have completed registration process and have an account in our database
   */
  static isFullyRegistered(userClaims: any): boolean {
    return !!userClaims.id;
  }
}
