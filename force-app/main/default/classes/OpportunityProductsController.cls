public with sharing class OpportunityProductsController {
    
    @AuraEnabled
    public static List<PricebookEntry> getAllProducts(){
        return [SELECT Id, Product2.Id, Product2.Name, ProductCode, UnitPrice 
                FROM PricebookEntry
                WHERE Pricebook2Id IN (SELECT Id FROM PriceBook2 WHERE Name = 'Standard') LIMIT 5];
    }
}