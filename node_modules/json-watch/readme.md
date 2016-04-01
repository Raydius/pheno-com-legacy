# node-json-watch

auto reload a json file when it's changed without restart your project

## installation
    npm install json-watch

## usage
    var jsonWatcher = require('json-watch');
    jsonWatcher.watch('/absolute/path/to/the/file.json');
    // then you can use `jsonWatcher.get()` to access your data
    console.log(jsonWatcher.get())
    // if `file.json` is changed, the value of `jsonWatcher.get()` will auto reload, no need to restart your project
**Important**: use **jsonWatcher.get()**, not `var json = jsonWatcher.get(); console.log(json);`. otherwise the `json` will not change when the file changed 
    
## contact me
[csser.me](http://csser.me)