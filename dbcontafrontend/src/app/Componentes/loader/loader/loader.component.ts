import { Component } from '@angular/core';
import { NgxUiLoaderComponent, NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-loader',
  imports: [NgxUiLoaderModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {

}
