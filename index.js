function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
};

console.log("hello")

ko.applyBindings(new WebmailViewModel());