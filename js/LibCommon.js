// LibCommon

//
var LibCommon = {
    formatDate : function (date, format) {
        if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
        format = format.replace(/YYYY/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        if (format.match(/S/g)) {
            var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
            var length = format.match(/S/g).length;
            for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
        }
        return format;
	},
    get_item: async function(items, id){
        var ret = null;
        items.forEach(function(item){
//            console.log(item.id );
            if(item.id == id){
                ret = item
            }
        });
        return ret
    },	
    get_reverse_items: function(items){
		var data =[]
		var self = this
        items.forEach(function(item){
            var date = new Date(item.created_at)
            date = self.formatDate(date, 'YYYY-MM-DD hh:mm')
            item.created_at = date
//console.log(date)
            data.unshift(item)                        
        });        
        return data
    },		
	func1 : function(){
		console.log("#-func1");
	},
}

