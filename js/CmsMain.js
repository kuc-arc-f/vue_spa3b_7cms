// CmsMain

//
var CmsMain = {
	load : function(){
//		console.log("#-load");
		new Vue({
			el: '#app',
			created () {
				this.get_items();
			},    
			data: {
				cms_items : [],
				modal_item : {
					title: "", content: "" ,created_at: ""
				},
			},
			methods: {
				get_items (){
					var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
		//console.log( dt )            
					axios.get('/cms.json?' + dt).then(res =>  {
						var data = res.data
						this.cms_items = LibCommon.get_reverse_items(data.items )
//		console.log( new Date(data.save_date) )
					})            
				},
				open_modal: async function(id) {
		console.log( id )
					var item  =await LibCommon.get_item(this.cms_items, id)
					item.content = marked( item.content);
		//console.log( item.title )
					this.modal_item = item;
					$('#myModal').modal('show');
		//            this.delete_ok = 0;
				},        
			}
		});
		

	},
}

