Salesforce Platform Event & Electron Sample
===========================================

A sample Electron app using Salesforce's Platform Event.

![](https://cdn-ak.f.st-hatena.com/images/fotolife/d/dackdive/20171215/20171215045733.gif)

### Installation & Usage

1. First you need to deploy some metadata to your org.  
Go to `salesforce-metadata` directory and follow the README.

```zsh
$ git clone https://github.com/zaki-yama/chatter-desktop
$ cd chatter-desktop/salesforce-metadata

# Then follow salesforce-metadata/README.md ...
```

2. Open your Salesforce org, open Process Builder, then activate the process named `FeedItemPosted`.

3. Run the Electron app. Please follow the README placed in `electron/` directory.
