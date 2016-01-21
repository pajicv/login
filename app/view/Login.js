Ext.define('login.view.Login', {
	extend: 'Ext.form.Panel',
	
	requires: [
		'Ext.form.action.StandardSubmit'
	],
	
	store: null,
	
	lang: null,
	
	userNameLabel: 'Korisničko ime',
	passwordLabel: 'Lozinka',
	comboEmptyText: 'Izberite jezik...',
	langLabel: 'Jezik',
	
	initComponent: function() {
		var me = this;
		
		Ext.applyIf(me, {
			labelWidth:80,
			url:'agrogis.jsp', 
			frame:true, 
			title:'Login', 
			defaultType:'textfield',
			monitorValid:true,
			standardSubmit: true,
			method:'POST',
			items:[{ 
				xtype: 'combobox',
				fieldLabel: me.langLabel, 
				store: me.store,
				displayField:'language',
				queryMode: 'local',
				emptyText: me.comboEmptyText,
				value: me.getLangName(),
				name: 'lang',
				listConfig: {
					getInnerTpl: function() {
						return '<img src="./images/flag-{code}.png" align="left"></img><p>{language}</p>';
					}
				},
				listeners: {
					select: {
						fn: function(cb, records) {
							var record = records[0];
							window.location.search = Ext.urlEncode({"lang":record.get("code")});
						},
						scope: me
					}
				}
			},{ 
				xtype: 'textfield',
				fieldLabel: me.userNameLabel, 
				name:'loginUsername', 
				allowBlank:false 
			},{ 
				xtype: 'textfield',
				fieldLabel:me.passwordLabel, 
				name:'loginPassword', 
				inputType:'password', 
				allowBlank:false 
			}],
			buttons:[{ 
				text:'Login',
				formBind: true,	 
				handler:function(){ 
					me.getForm().submit(); 
				} 
			}]
		
		});
		
		me.callParent();
		
	},
	
	getLangName: function() {
		var record = this.store.findRecord('code', this.lang, null, null, null, true);
					
		if(record) {
			return record.data.language;
		} else {
			return '';
		}
	}
});
		
