public with sharing class OpportunityContactsController {

    @AuraEnabled
    public static List<Contact> getAllContacts(Id accountId){
        return [SELECT Id, Name, AccountId, Email FROM Contact WHERE AccountId =: accountId]; // Account
    }

    @AuraEnabled
    public static List<String> getContactRoleOptions(){
        List<String> roleOptions = new List<String>();
        
        Schema.DescribeFieldResult fieldRes = OpportunityContactRole.Role.getDescribe();
        List<Schema.PicklistEntry> entries = fieldRes.getPicklistValues();
        
        for(Schema.PicklistEntry en: entries){
            roleOptions.add(en.getValue());
        } 

        return roleOptions;
    }
}
