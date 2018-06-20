import {NgModule} from '@angular/core';
import {ContentComponent} from './component/content/content.component';

/**
 * bootstrap-table模块，在项目中多处使用，可以在此定义，在使用的地方直接导入即可
 */

@NgModule({

  declarations:[
    ContentComponent
  ],

  exports: [
    ContentComponent
  ],

})

export class TableModule { }
