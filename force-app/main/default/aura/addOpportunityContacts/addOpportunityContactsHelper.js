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
            {'label': 'Role','fieldName': 'Role','type': 'text'}
        ];
        component.set("v.contactRoleColumns", cols);
    }, 
    
    createContactRole: function(component, event, helper){
        var contactItem = {sObjectType: "OpportunityContactRole"};
        var selectedContacts = component.find("contactsTable").getSelectedRows();
        var selectedContact = selectedContacts[0];
        var role = component.find("role").get("v.value");
        
        contactItem.ContactId = selectedContact.Id;
        contactItem.Role = role;
        
        component.set("v.contactRole", contactItem);
        this.updatePrimarySelectList(component, contactItem);
    }, 

    addItem: function(component, event, helper){
        this.createContactRole(component, event, helper);
        var contactItem = component.get("v.contactRole");
        var contactRoles = component.get("v.contactRoles");
        contactRoles.push(contactItem);
        component.set("v.contactRoles", contactRoles);
        component.set("v.isTableEmpty", false);
    }, 

    updatePrimarySelectList: function(component, contactItem){
        var primaryContactList = component.get("v.primaryContactSelectList");
        primaryContactList.push({
            "label": contactItem.ContactId,
            "value": contactItem.ContactId
        });
        component.set("v.primaryContactSelectList", primaryContactList);
    },

    selectPrimaryContact: function(component, event){
        var selectedContact = event.getParam("value");
        var contactRoles = component.get("v.contactRoles");
        contactRoles.forEach(role => {
            role.IsPrimary = false;
            if(role.ContactId == selectedContact){
                role.IsPrimary = true;
            }
        });
        component.set("v.contactRoles", contactRoles);
    }
})