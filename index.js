function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();
    
    // Behaviors
    self.goToFolder = function(folder) { self.chosenFolderId(folder); };
};

console.log("hello")

ko.applyBindings(new WebmailViewModel());