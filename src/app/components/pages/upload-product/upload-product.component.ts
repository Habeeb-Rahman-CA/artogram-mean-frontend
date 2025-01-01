import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-upload-product',
  imports: [FormsModule, CommonModule, RouterModule, FloatLabelModule, SelectModule],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.css'
})
export class UploadProductComponent implements OnInit {

  categories: any[] = []
  category: any
  img: string = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  ngOnInit(): void {
    this.categories = [{ name: 'Category 1' }, { name: 'Category 2' }, { name: 'Category 3' }]
  }

  onDragOver(event: DragEvent) {
    event.preventDefault()
  }

  onDrop(event: DragEvent) {
    event.preventDefault()
    if (event.dataTransfer?.files) {
      this.addFile(event.dataTransfer?.files)
    }
  }

  addFile(file: FileList) {
    for (let i = 0; i < file.length; i++) {
      if (file[i].type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file[i])
        this.img = imageUrl
      }
    }
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files) {
      this.addFile(input.files)
    }
  }

}
