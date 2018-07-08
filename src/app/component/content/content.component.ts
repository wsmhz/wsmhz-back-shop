import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminService} from '../../service/admin/admin.service';
import {text} from '@angular/core/src/render3/instructions';
import {CommonUtil} from '../../utils/commonUtil';

declare let $: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers:[
    AdminService
  ]
})
export class ContentComponent implements OnInit {

  @Input()
  url : string;
  @Input()
  columns : any;
  @Input()
  searchVal : string;
  @Output()
  clickId:EventEmitter<number> = new EventEmitter();

  constructor(
    private commonUtil:CommonUtil
  ) { }


  ngOnInit() {
    //  1.初始化Table
    $('#dataTable').bootstrapTable({
      url: this.url,                      //  请求后台的URL（*）
      method: 'get',                      // 请求方式（*）
      dataType :'json',
      contentType :'application/json',
      toolbar: '#toolbar',                // 工具按钮用哪个容器
      striped: true,                      // 是否显示行间隔色
      cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
      pagination: true,                   // 是否显示分页（*）
      sortable: false,                     // 是否启用排序
      sortOrder: "desc",                   // 排序方式
      singleSelect:true,
      queryParamsType:'',                   // 默认为limit
      queryParams: (params)=> { // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        return {
          pageSize: params.pageSize, // 每页要显示的数据条数
          pageNum: params.pageNumber , // 当前页
          search: ""
        };
      },
      responseHandler: function(res) {
        return {
          "total": res.data.total,// 总页数
          "rows": res.data.rows   // 数据
        };
      },
      sidePagination: "server",           // 分页方式：client客户端分页，server服务端分页（*）
      pageNumber:1,                       // 初始化加载第一页，默认第一页
      pageSize: 10,                       // 每页的记录行数（*）
      pageList: [10, 25],                 // 可供选择的每页的行数（*）
      search: false,                       // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
      showColumns: true,                  // 是否显示所有的列
      showRefresh: true,                  // 是否显示刷新按钮
      minimumCountColumns: 2,             // 最少允许的列数
      clickToSelect: true,                // 是否启用点击选中行
      // height: 500,                        // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
      uniqueId: "id",                     // 每一行的唯一标识，一般为主键列
      showToggle:true,                    // 是否显示详细视图和列表视图的切换按钮
      cardView: false,                    // 是否显示详细视图
      detailView: false,                   // 是否显示父子表
      onClickRow:row=>{
        this.clickId.emit(row.id);
      },
      onLoadError: (status, res)=>{  // 加载失败时执行
        this.commonUtil.toastr_error(JSON.parse(res.responseText).msg);
      },
      columns: this.columns
    });
  }


}
