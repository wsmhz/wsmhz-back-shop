import {Component, OnInit} from '@angular/core';
import {CommonConfig} from '../../../config/commonConfig';
import {CommonUtil} from '../../../utils/commonUtil';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductService} from '../../../service/product/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../service/category/category.service';

declare var $:any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers:[
    ProductService,
    CategoryService
  ]
})
export class ProductDetailComponent implements OnInit {

  product = new Product();
  productForm : FormGroup;
  categoryList = [];
  subImageList = [];
  insertFlag = "";
  constructor(
    private routerInfo:ActivatedRoute,
    private commonConfig:CommonConfig,
    private commonUtil:CommonUtil,
    private productService:ProductService,
    private categoryService:CategoryService
  ) {
    this.productForm = new FormBuilder().group({
      name: ['', Validators.required],
      subtitle: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  ngOnInit() {
    let id = this.routerInfo.snapshot.queryParams["id"];
    this.insertFlag = this.routerInfo.snapshot.queryParams["insertFlag"];
    if( ! this.commonUtil.isNull(id)){
      this.productService.select(id)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            this.product = res.data;
            let imgs = this.product.subImages;
            this.subImageList = imgs.split(",");
          }
        });
    }
    this.categoryService.selectAll()
      .then(response => {
        if(response.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.categoryList = response.data;
        }
      });
  }

  goBack() {
    history.go(-1);
  }

  save(){
    if(this.productForm.valid){
      let subImages = "";
      for (let i=0; i<this.subImageList.length; i++) {
        i===this.subImageList.length-1 ? subImages += this.subImageList[i] : subImages = subImages + this.subImageList[i] + ",";
      }
      this.product.subImages = subImages;
      let flag = this.insertFlag ==="false" ? false : true;
      if(flag){
        this.productService.insert(this.product)
          .then(response => {
            if(response.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
                this.goBack();
            }
          });
      }else{
        this.productService.update(this.product)
          .then(response => {
            if(response.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              this.goBack();
            }
          });
      }

    }


  }

  deleteImg(img:string,i:number){
    if( ! this.commonUtil.isNull(img)){
      if(window.confirm("确定要删除吗？")){
        this.subImageList.splice(i,1);
        this.productService.deleteImg(img)
          .then(response => {
            if(response.status === this.commonConfig.RESPONSE_CODE.SUCCESS){

            }
          });
      }
    }
  }

  upload(file: HTMLInputElement){
    console.log(file.files);
    if (file.value.length === 0) {
      return;
    }
    let files: FileList = file.files;
    let formData: FormData = new FormData();
    formData.append('file', files.item(0));
    this.productService.upload(formData)
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.subImageList.push(res.data);
          $("#file").val("");
        }
      });
  }

}
