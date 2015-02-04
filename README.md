missile-box
============

Flat, responsive, lightweight, fast, easy customizable modal window plugin.


## Install

```
npm install missile-box
```

## Usage
```javascript
var Box = require('missile-box');

var box = new Box({
	title: 'Confirm Message',
	animate: 'fadeIn',
	type: 'confirm', // default=dialog (confirm/alert)
	before: function() {
		console.log('before', this);
	},
	done: function () {
		console.log('done', this);
	},
	ok: function (e) {
		alert('clicked ok button');
		console.log(this, e.currentTarget);
	},
	cancel: function (e) {
		alert('clicked cancel button');
		console.log(this, e.currentTarget);
	}
});
```