import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ProductService } from '../../../../services/product/product.service';
import { IProduct } from '../../../../model/product';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-upload-product',
  imports: [FormsModule, CommonModule, RouterModule, FloatLabelModule, SelectModule, TextareaModule, ToastModule],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.css'
})
export class UploadProductComponent implements OnInit {

  productService = inject(ProductService)
  messageService = inject(MessageService)

  product: IProduct = {
    name: '',
    desc: '',
    price: '',
    category: '',
    img: 'draganddrop.png'
  }

  categories: string[] = []

  ngOnInit(): void {
    this.categories = ['Painting', 'Drawing', 'Sculpture', 'Photography', 'Digital Art']
  }

  //Upload image(Cloudinary)
  uploadImg(file: File) {
    const formData = new FormData()
    formData.append('img', file, file.name)
    this.productService.uploadImg(formData).subscribe({
      next: (res: any) => {
        this.product.img = res.img
        this.messageService.add({severity: 'success', summary: 'Uploaded', detail: 'Image uploaded successfully', life: 3000})
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Failed', detail: 'Failed to upload image', life: 3000})
        console.log(err.message)
      }
    })
  }

  //Upload Product and Input Change
  uploadProduct() {
    this.productService.createProduct(this.product).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Uploaded', detail: 'Product Uploaded successfully', life: 3000})
        this.product = {
          name: '',
          desc: '',
          price: '',
          category: '',
          img: 'draganddrop.png'
        }
      },
      error: (error) => {
        this.messageService.add({severity: 'error', summary: 'Failed', detail: 'Failed upload product', life: 3000})
        console.error(error.message)
      }
    })
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files) {
      const file = input.files[0]
      this.product.img = URL.createObjectURL(file)
      this.uploadImg(file)
    }
    input.value = ''
  }
}