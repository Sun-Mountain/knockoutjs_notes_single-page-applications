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