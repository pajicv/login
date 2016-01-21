Ext.define('login.Application', {
    name: 'login',

    extend: 'Ext.app.Application',

    views: [
        //'Login'
    ],

    controllers: [
        // TODO: add controllers here
    ],

    stores: [
        'Language'
    ],
	
	launch: function() {
		var me = this;
		
		Ext.tip.QuickTipManager.init();
		
		var params = Ext.urlDecode(window.location.search.substring(1));
		
		var store = me.getLanguageStore();
		
		me.lang = 'sr';
		
		var record, url;

		if (params.lang) {
		   
			record = store.findRecord('code', params.lang, null, null, null, true);
			
			if(record) {
				me.lang = record.data.code;
			}
		}            
	
		if (params.lang) {
			record = store.findRecord('code', params.lang, null, null, null, true);
			url = Ext.util.Format.format("./locale/login-lang-{0}.js", params.lang);
			
			Ext.Loader.injectScriptElement(
				url,
				me.onSuccess,
				me.onFailure,
				me);
		} else {
			me.setupLogin();
		}
	},
	
	onSuccess: function() {
			this.setupLogin();
		},
	
	onFailure: function() {
			Ext.Msg.alert('Failure', 'Failed to load locale file.');
			this.setupLogin();
	},
	
	setupLogin: function() {
		var me = this;
		
		var loginForm = Ext.create('login.view.Login', {
			store: me.getLanguageStore(),
			lang: me.lang
		});
		
		var win = new Ext.Window({
			layout:'auto',
			width:300,
			height:180,
			closable: false,
			resizable: false,
			plain: true,
			border: false,
			items: [
				loginForm
			]
		});
		win.show();
		
		var navView = Ext.create('Ext.util.KeyNav', {
			target: loginForm.getEl(), 
			enter: function(e) {
				this.getForm().submit();
			},
			scope: loginForm
		});
	}
			
	
});
