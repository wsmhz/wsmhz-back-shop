declare let $: any;

/**
 * bootstrap-table
 * 获取选中行
 */
export function tableSelectRow(){
  return  $('#dataTable').bootstrapTable('getSelections');
}
/**
 * bootstrap-table
 * 刷新
 */
export function tableRefresh(){
  return  $('#dataTable').bootstrapTable('refresh');
}
/**
 * ztree
 * 递归勾选树节点，需要:children属性
 */
export function treeDeepSelect(tree:any,dataObj:any){
  for (let item of dataObj) {
    tree.checkNode(tree.getNodeByParam("id",item.id), true);
    this.treeDeepSelect(tree,item.children);
  }
}
