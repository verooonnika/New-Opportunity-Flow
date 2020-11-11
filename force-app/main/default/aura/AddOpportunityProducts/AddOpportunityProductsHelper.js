({
    getAllProducts: function(component) {
        var action = component.get("c.getAllProducts");
        action.setCallback(this, function(response) {
            var rows = response.getReturnValue();
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];                
                row.ProductName = row.Product2.Name;
            }
            component.set("v.products", rows);
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
            {'label': 'Product', 'fieldName': 'ProductName','type': 'text'},
            {'label': 'Quantity','fieldName': 'Quantity','type': 'text'},
            {'label': 'Total Price','fieldName': 'TotalPrice','type': 'currency'}
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
        productItem.TotalPrice = price * quantity;
        
        component.set("v.product", productItem);
        this.updateTableData(component, productItem, selectedProduct);
    },
    
    updateTableData: function(component, productItem, selectedProduct){
        var tableData = component.get("v.opportunityProductsView");
        productItem.ProductName = selectedProduct.ProductName;
        tableData.push(productItem);
        component.set("v.opportunityProductsView", tableData);
    }
})