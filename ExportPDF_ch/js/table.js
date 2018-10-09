
$(function () {
    $('#db_dependences').bootstrapTable({
    	method:'POST',
        dataType:'json',
        contentType: "application/x-www-form-urlencoded",
        cache: false,
        striped: true,                              //是否显示行间隔色
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        showColumns:true,
        pagination:true,
        minimumCountColumns:2,
        pageNumber:1,                       //初始化加载第一页，默认第一页
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        showRefresh: true,                  //是否显示刷新按钮
        pageSize: 1,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showExport: true,                    
        exportDataType: 'all',
        exportTypes:[ 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'],  //导出文件类型
        columns: [{
	        field: 'id',
	        title: 'Item ID'
	    }, {
	        field: 'name',
	        title: 'Item Name'
	    }, {
	        field: 'price',
	        title: 'Item Price'
	    }],
	    data: [{
	        id: 1,
	        name: '项目 1',
	        price: '价格$1'
	    }, {
	        id: 2,
	        name: '项目 2',
	        price: '价格$2'
	    }]
	});
});
