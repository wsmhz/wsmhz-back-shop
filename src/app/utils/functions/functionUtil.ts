declare let $: any;

export function tableSelectRow(){
  return  $('#dataTable').bootstrapTable('getSelections');
}

export function tableRefresh(){
  return  $('#dataTable').bootstrapTable('refresh');
}
