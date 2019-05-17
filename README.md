# KnockoutJS Notes: Single Page Applications

But first a quick defination:

**Hash-based navigation** (or **pushState** navigation) - where avisitor's position in a virtual navigation space is stored in the URL hash, which is the part of the URL after a 'hash' symbol (e.g.,  /my/app/#category=shoes&page=4).


## Building a Webmail Client

In your JS file, you have a simple view model with some folders:

**JavaScript**
```JavaScript
function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
};

ko.applyBindings(new WebmailViewModel());
```

Let's use `foreach` to display the folders in a list.

**HTML**
```HTML
<ul data-bind="foreach: folders">
    <li data-bind="text: $data"></li>
</ul>
```

Style as needed.


#### Make folders selectable

Because this is MVVM, we'll represent navigation position using viewmodel properties. That will make hash-based navigation very easy later. Add a  `chosenFolderId` property to your viewmodel class, and a function called  `goToFolder`:

**JavaScript**
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

**JavaScript**
```JavaScript
self.goToFolder = function(folder) { 
    self.chosenFolderId(folder);
    // This tells where the ajax request to 
    $.get('/mail', { folder: folder }, self.chosenFolderData);
};
```

Next we need to display `chosenFolderData` as a grid.

**HTML**
```html
<!-- Mails grid -->
<table class="mails" data-bind="with: chosenFolderData">
    <thead><tr><th>From</th><th>To</th><th>Subject</th><th>Date</th></tr></thead>
    <tbody data-bind="foreach: mails">
        <tr>
            <td data-bind="text: from"></td>
            <td data-bind="text: to"></td>
            <td data-bind="text: subject"></td>
            <td data-bind="text: date"></td>
        </tr> 
    </tbody>
</table>
```

The `with` binding creates a binding context that will be used when binding any elements inside it. In this example, everything inside the `<table>` will be bound to `chosenFolderData`, so it's not necessary to use `chosenFolderData`. as a prefix before `mails`.

In order to make Inbox the default, we need to add one more line of code to the **JavaScript** file.

```JavaScript
function WebmailViewModel() {
    // ... leave everything else unchanged ...

    // Show inbox by default
    self.goToFolder('Inbox');
};
```


#### Viewing Individual Emails

First we need to define another view model:

**JavaScript**
```JavaScript
function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();
    self.chosenFolderData = ko.observable();
    // New addtion
    self.chosenMailData = ko.observable();

    // ... leave everything else unchanged ...
}
```

Next you need to update your bindings, so that if the visitor clicks on a row in the mails grid, your viewmodel loads the corresponding mail. First use the click binding on the `<tr>` elements:

**HTML**
```html
<tbody data-bind="foreach: mails">
    <tr data-bind="click: $root.goToMail">
    <!-- ... rest as before ... -->
```