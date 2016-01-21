Ext.define('login.store.Language', {
	extend: 'Ext.data.ArrayStore',
	
	fields: ['code', 'language'],
    data : [['sr', 'Srpski'], ['en', 'English']]
});