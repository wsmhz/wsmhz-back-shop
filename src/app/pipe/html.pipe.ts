import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: "html"
})
// html转化器，可使css生效
export class HtmlPipe implements PipeTransform{

  constructor (private sanitizer: DomSanitizer) {

  }

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }
}
