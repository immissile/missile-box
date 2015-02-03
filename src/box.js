'use strict';

if (typeof require != 'undefined') {
	var $ = require('jquery');
}

module.exports = function(options) {
    var defaults = {
        title: '操作提示',
		content: '',
        width: 500,
        height: 250,
        top: '20%',
		enableTitle: true,
		enableOverlay: true,
        modal: true,
        fixed: true,
        theme: 'default',
        template: null,
        debug: false,

        // 自动关闭时间(毫秒)， 0表示不会自动关闭
        timeClose: 0,

        // box wrap的扩展class
        klass: '',
		
		// 弹窗显示动画 default/fadeIn
		animate: 'default',
		
		// box 类型：dialog/alert/confirm
		type: 'dialog',

        before: function () {},
        done: function () {},
		ok: function () {},
		cancel: function () {}
    };

    defaults.template = getTpl();
	
	var self = this;

    this.config = $.extend(defaults, options);
    if (this.config.debug) {
        console.log('debug:config', this.config);
    }
	
	// init
	this.init = function () {
		if (self.config.type !== 'dialog') {
			self.config.width  = 400;
			self.config.height = 210;
		}
	};
	
	// parse template
	this.parseTpl = function () {
		self.config.template = self.config.template
			.replace('$content', getTplByType(self.config.type))
		
		self.config.template = self.config.template
			.replace('$klass', self.config.klass)
				.replace('$title', self.config.title)
				.replace('$content', self.config.content);
	};
	
	// append wrap to body
    this.append = function () {
		$('body').append(self.config.template);
		
		self.$wrapper = $('.missile-box-wrap');
		self.$overlay = $('.missile-box-overlay');
		self.$header= self.$wrapper.find('.m-box-header');
		self.$content = self.$wrapper.find('.m-box-container');
    };
	
	// reset box position
	this.setPosition = function () {
		self.$wrapper.css({
			width: self.config.width,
			height: self.config.height,
			top: self.config.top,
			left: '50%',
			marginLeft: -(self.config.width / 2)
		});
		
		if (self.config.enableOverlay) {
			self.$overlay.css({
				width: $(window).width(),
				height: $(window).height()
			});
		} else {
			self.$overlay.remove();
		}
	};
	
	// set box container
	this.setBox = function () {
		self.$content.css({
			height: self.config.height - self.$header.outerHeight()
		});
	};
	
	// box util
	this.util = {
		show: function () {
			self.$wrapper.show();
		},
		fadeIn: function () {
			self.$wrapper.fadeIn();
		},
		
		// clear if exists
		clear: function () {
			$('.missile-box-overlay, .missile-box-wrap').remove();
		}
	};
	
	this.bindActions = function () {
		if (self.config.debug) {
			console.log('debug:bindActions');
		}
		self.$wrapper.find('.m-box-close').click(self.methods.close);
		
		// btn-ok
		self.$wrapper.find('.btn-ok').click(function(e){
			self.config.ok.call(self, e);
		});
		
		// btn-cancel
		self.$wrapper.find('.btn-cancel').click(function(e){
			self.config.cancel.call(self, e);
		});
	};
	
	this.render = function () {
		self.init();
		self.util.clear();
		self.parseTpl();
		self.config.before.call(self);
		self.append();
		self.setPosition();
		self.setBox();
		switch(self.config.animate) {
			case 'default': self.util.show(); break;
			case 'fadeIn': self.util.fadeIn(); break;
		}
		
		self.bindActions();
		
		if (self.config.time) {
			setTimeout(function(){
				self.methods.close();
			}, self.config.time);
		}
		
		self.config.done.call(self);
		if (self.config.debug) {
			console.log('debug:render');
		}
		
		// listen scroll event
		var resizeStart = Date.now();
		var wait = 1 * 1000;
		$(window).resize(function(){
			var resizeStop = Date.now();
			if (resizeStop - resizeStart >= wait) {
				self.setPosition.call(this);
			}
		});
	};
	
	// methods
	this.methods = {
		close: function () {
			self.util.clear();
		}
	};
	
	
	function getTpl () {
		return '\
		<div class="missile-box-overlay"></div>\
		<div class="missile-box-wrap m-box-wrap $klass">\
			<div class="m-box-header">\
				<span class="m-box-title">$title</span>\
				<a class="m-box-close">X</a>\
			</div>\
			<div class="m-box-container">$content</div>\
			<div class="m-box-footer"></div>\
		</div>';
	}

	function getTplByType (type) {
		var _dialog = '$content';
		
		var _confirm = '\
		<div class="m-box-content">\
			<h2>确定要删除这条记录吗？</h2>\
			<div class="m-row">\
				<button class="btn btn-ok">确定</button>\
				<button class="btn btn-cancel">取消</button>\
			</div>\
		</div>';
		
		var _alert = '\
		<div class="m-box-content">\
			<h2>确定要删除这条记录吗？</h2>\
			<div class="m-row">\
				<button class="btn btn-ok">确定</button>\
			</div>\
		</div>';
		
		var tpl = null;
		switch (type) {
			case 'alert': tpl = _alert; break;
			case 'confirm': tpl = _confirm; break;
			case 'dialog': tpl = _dialog; break;
			default: tpl = _dialog;
		}
		return tpl;
	}
	
	this.render.call(this);
};

