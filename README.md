# KnockoutJS Notes: Single Page Applications

But first a quick defination:

**Hash-based navigation** (or **pushState** navigation) - where avisitor's position in a virtual navigation space is stored in the URL hash, which is the part of the URL after a 'hash' symbol (e.g.,  /my/app/#category=shoes&page=4).


## Building a Webmail Client

In your JS file, you have a simple view model with some folders:

```JavaScript
function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
};

ko.applyBindings(new WebmailViewModel());
```

Let's use `foreach` to display the folders in a list.

```HTML
<ul data-bind="foreach: folders">
    <li data-bind="text: $data"></li>
</ul>
```

Style as needed.


#### Make folders selectable

Because this is MVVM, we'll represent navigation position using viewmodel properties. That will make hash-based navigation very easy later. Add a  `chosenFolderId` property to your viewmodel class, and a function called  `goToFolder`:

```JavaScript
function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();

    // Behaviours
    self.goToFolder = function(folder) { self.chosenFolderId(folder); };
};
```

**Reminder**: An **observable** is a property that automatically will issue notifications whenever their value changes.

Next, whenever the user navigates to a folder, populate `chosenFolderData` by performing an Ajax request:

```JavaScript
self.goToFolder = function(folder) { 
    self.chosenFolderId(folder);
    // This tells where the ajax request to 
    $.get('/mail', { folder: folder }, self.chosenFolderData);
};
```