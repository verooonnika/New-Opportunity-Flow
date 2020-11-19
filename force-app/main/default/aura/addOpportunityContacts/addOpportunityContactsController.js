({
    onInit: function(component, event, helper){
        helper.getAllContacts(component);
        helper.initContactRolesTable(component);
        helper.initContactsTable(component);
        helper.getRoleOptions(component);
    } ,

    handleSaveContact: function(component, event, helper) {

        var selectedContacts = component.find("contactsTable").getSelectedRows();
        if (selectedContacts.length == 0){
            component.set("v.showError", true);
            component.set("v.message", 'Please, choose contact');
            return;
        }

        helper.addItem(component);
    },
    
    selectContact: function(component){
        component.set("v.showError", false);
    },

    changePrimaryContact: function(component, event, helper){
        component.set("v.showError", false);
        helper.selectPrimaryContact(component, event);
    }
})