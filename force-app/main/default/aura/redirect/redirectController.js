({
    redirectToRecord: function (component, event, helper) {
        var navigate = $A.get("e.force:navigateToSObject");
        navigate.setParams({
            "recordId": component.get("v.insertedOppId"),
        });
        navigate.fire();
    }
})