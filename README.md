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

// Dialog
var box = new Box({
	title: 'Dialog Title',
	animate: 'fadeIn',
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

// Confirm
var box = new Box({
	title: 'Confirm Tips',
	subTitle: 'Are you sure you want to do this?',
	type: 'confirm',
	animate: 'fadeIn',
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

// Alert
var box = new Box({
	title: 'Alert Tips',
	subTitle: 'Missile Fired!',
	type: 'alert',
	animate: 'fadeIn',
	done: function () {
		console.log('done', this);
	},
	ok: function (e) {
		alert('clicked ok button');
		console.log(this, e.currentTarget);
	}
});
```