// CmsMain

//
var CmsMain = {
    load : function(){
        new Vue({
            el: '#app',
            created () {
                this.page_items( this.page_number );
            },    
            data: {
                cms_items : [],
                items_all : [],
                modal_item : {
                    title: "", content: "" ,created_at: ""
                },
                pagenate_display : 0,
                page_one_max : 20, /* 1 page max */
                page_number : 1,
                page_max : 0,
            },
            methods: {
                page_items (page ){
                    var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
                    axios.get('/cms.json?' + dt).then(res =>  {
                        var data = res.data
                        var items = LibCommon.get_reverse_items(data.items )
                        this.items_all = items;
                        this.page_max = LibPaginate.get_max_page(items, this.page_one_max)
                        this.cms_items = LibPaginate.get_items(items, page , this.page_one_max )
//		console.log( new Date(data.save_date) )
                        if(this.page_max >=2 ){
                            this.pagenate_display = 1
                        }
//console.log( this.page_max )
                    })            
                },
                get_next_items: function(){
                    this.page_number += 1
                    var items  = LibPaginate.get_items(
                        this.items_all, this.page_number , this.page_one_max 
                    );
                    items = LibPaginate.add_page_items(this.cms_items, items );
//onsole.log( items )
                },				
                open_modal: async function(id) {
                    var item  =await LibCommon.get_item(this.cms_items, id)
                    item.content = marked( item.content);
//console.log( item.title )
                    this.modal_item = item;
                    $('#myModal').modal('show');
                },        
            }
        });
        

    },
}
// start-Load
CmsMain.load()
