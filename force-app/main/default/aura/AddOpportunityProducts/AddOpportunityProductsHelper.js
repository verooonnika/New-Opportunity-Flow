({
    getAllProducts: function(component) {
        var action = component.get("c.getAllProducts");
        action.setParams({
            priceBook : component.get("v.priceBookId")
        });
        action.setCallback(this, function(response) {
            var rows = response.getReturnValue();
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];                
                row.ProductName = row.Product2.Name;
            }
           
            component.set("v.products", rows);
            
            /*var selectedRowsIds = rows[0].Id;
            component = component.find("productsTable");
            component.set("v.selectedRows", selectedRowsIds);*/
        });
        
        $A.enqueueAction(action);
    },
    
    initProductsTable: function(component){
        var cols = [
            {'label': 'Name', 'fieldName': 'ProductName', 'type': 'text'},
            {'label': 'Product Code', 'fieldName': 'ProductCode','type': 'text'},
            {'label': 'UnitPrice','fieldName': 'UnitPrice','type': 'currency'}
        ];
        component.set("v.productColumns", cols);
    },
    
    initOpportunityProductsTable: function(component){
        var cols = [
            {'label': 'Product', 'fieldName': 'Name','type': 'text'},
            {'label': 'Quantity','fieldName': 'Quantity','type': 'text'},
            {'label': 'Unit Price','fieldName': 'UnitPrice','type': 'currency'}
        ];
        component.set("v.oppProductColumns", cols);
    }, 
    
    createOpportunityProduct: function(component, event, helper){
        var productItem = {sObjectType: "OpportunityLineItem"};
        var selectedProducts = component.find("productsTable").getSelectedRows();
        var selectedProduct = selectedProducts[0];
        var price = component.find("price").get("v.value");
        var quantity = component.find("quantity").get("v.value");
        
        productItem.Quantity = quantity;
        productItem.PricebookEntryId = selectedProduct.Id;
        productItem.UnitPrice = price;
        productItem.Name = selectedProduct.ProductName;
        
        component.set("v.product", productItem);
    }, 

    addItem: function(component, event, helper){
        this.createOpportunityProduct(component, event, helper);
        var productItem = component.get("v.product");
        var products = component.get("v.opportunityProducts");
        products.push(productItem);
        component.set("v.opportunityProducts", products);
        component.set("v.isTableEmpty", false);
    }
})