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
            var defaultRole = response.getReturnValue()[0];
            response.getReturnValue().forEach(role => {
                var item = {
                    "label": role,
                    "value": role
                };
                roles.push(item); 
            });
            component.set("v.roles", roles);
            component.set("v.defaultRole", defaultRole);
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
            {'label': 'Contact', 'fieldName': 'ContactName','type': 'text'},
            {'label': 'Role','fieldName': 'Role','type': 'text'}
        ];
        component.set("v.contactRoleColumns", cols);
    }, 
    
    createContactRole: function(component, event, helper, selectedContact){
        var contactItem = {sObjectType: "OpportunityContactRole"};
        
        var role = component.find("role").get("v.value");
        
        contactItem.ContactId = selectedContact.Id;
        contactItem.Role = role;
        
        component.set("v.contactRole", contactItem);
    }, 

    addItem: function(component, event, helper){
        var selectedContacts = component.find("contactsTable").getSelectedRows();
        var selectedContact = selectedContacts[0];

        this.createContactRole(component, event, helper, selectedContact);
        var contactItem = component.get("v.contactRole");
        var contactRoles = component.get("v.contactRoles");

        contactRoles.forEach(contactRole => {
            if(contactRole.ContactId == contactItem.ContactId){
                component.set("v.showError", true);
                component.set("v.message", 'Contact Role with this Contact already exists');
                return;
            }
        });

        contactRoles.push(contactItem);
        component.set("v.contactRoles", contactRoles);

        var contactRolesView = component.get("v.contactRolesView");
        contactItem.ContactName = selectedContact.Name;
        contactRolesView.push(contactItem);
        component.set("v.contactRolesView", contactRolesView);

        this.updatePrimarySelectList(component, contactItem);

        component.set("v.isTableEmpty", false);
    }, 

    updatePrimarySelectList: function(component, contactItem){
        var primaryContactList = component.get("v.primaryContactSelectList");
        primaryContactList.push({
            "label": contactItem.ContactName,
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