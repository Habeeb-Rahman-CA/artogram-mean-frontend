import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ProductService } from '../../../services/product/product.service';
import { IProduct } from '../../../model/product';

@Component({
  selector: 'app-upload-product',
  imports: [FormsModule, CommonModule, RouterModule, FloatLabelModule, SelectModule, TextareaModule],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.css'
})
export class UploadProductComponent implements OnInit {

  productService = inject(ProductService)

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
        alert('image uploaded')
      },
      error: (err) => {
        alert('failed to get the image')
        console.log(err.message)
      }
    })
  }

  //Upload Product and Input Change
  uploadProduct() {
    this.productService.createProduct(this.product).subscribe({
      next: () => {
        alert('New Product Added')
        this.product = {
          name: '',
          desc: '',
          price: '',
          category: '',
          img: 'draganddrop.png'
        }
      },
      error: (error) => {
        alert('Something went wrong')
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