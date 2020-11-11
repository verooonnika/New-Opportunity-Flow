({
    onInit: function(component, event, helper){
        helper.getAllProducts(component);
        helper.initOpportunityProductsTable(component);
        helper.initProductsTable(component);
    },
    
    addItem: function(component, event, helper){
        helper.createOpportunityProduct(component, event, helper);
        var productItem = component.get("v.product");
        var products = component.get("v.opportunityProducts");
        products.push(productItem);
        component.set("v.opportunityProducts", products);
        component.set("v.isTableEmpty", false);
    },
    
    selectProduct: function(component){
        var selectedProducts = component.find("productsTable").getSelectedRows();
        var selectedProduct = selectedProducts[0];
        var priceInput = component.find("price");
        priceInput.set("v.value", selectedProduct.UnitPrice);
    }
})