public with sharing class AccountController {
    @AuraEnabled
    public static List<Account> getAll() {
        try {
            return [SELECT Id, Name, Company FROM Account WITH SECURITY_ENFORCED];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
