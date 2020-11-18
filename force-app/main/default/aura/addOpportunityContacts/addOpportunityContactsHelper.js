({
    getAllContacts: function(component) {
        var action = component.get("c.getAllContacts");
        var account = component.get("v.selectedAccount");
        action.setParams({
            accountId : account.Id
        });
        action.setCallback(this, function(response) {
            component.set("v.contacts", response.getReturnValue());
        });
        
        $A.enqueueAction(action);
    },

    getRoleOptions: function(component){
        var action = component.get("c.getContactRoleOptions");
        action.setCallback(this, function(response) {
            var roles = [];
            response.getReturnValue().forEach(role => {
                var item = {
                    "label": role,
                    "value": role
                };
                roles.push(item); 
            });
            component.set("v.roles", roles);
        });
        
        $A.enqueueAction(action);
    },
    
    initContactsTable: function(component){
        var cols = [
            {'label': 'Name', 'fieldName': 'Name', 'type': 'text'},
            {'label': 'Email', 'fieldName': 'Email','type': 'text'}
        ];
        component.set("v.contactColumns", cols);
    },
    
    initContactRolesTable: function(component){
        var cols = [
            {'label': 'Contact', 'fieldName': 'ContactId','type': 'text'},
            {'label': 'Primary','fieldName': 'IsPrimary','type': 'checkbox'},
            {'label': 'Role','fieldName': 'Role','type': 'text'}
        ];
        component.set("v.contactRoleColumns", cols);
    }, 
    
    createContactRole: function(component, event, helper){
        var contactItem = {sObjectType: "OpportunityContactRole"};
        var selectedContacts = component.find("contactsTable").getSelectedRows();
        var selectedContact = selectedContacts[0];
        var role = component.find("role").get("v.value");
        var isPrimary = component.find("primary").get("v.checked");
        
        contactItem.ContactId = selectedContact.Id;
        contactItem.Role = role;
        contactItem.IsPrimary = isPrimary;

        console.debug(isPrimary);
        
        component.set("v.contactRole", contactItem);
    }, 

    addItem: function(component, event, helper){
        this.createContactRole(component, event, helper);
        var contactItem = component.get("v.contactRole");
        var contactRoles = component.get("v.contactRoles");
        contactRoles.push(contactItem);
        component.set("v.contactRoles", contactRoles);
        component.set("v.isTableEmpty", false);
    } 
})