import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../../model/product';
import { UserService } from '../../../../services/user/user.service';
import { ProductService } from '../../../../services/product/product.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-artist-detail',
  imports: [CommonModule, ToastModule],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.css'
})
export class ArtistDetailComponent implements OnInit {

  userService = inject(UserService)
  productService = inject(ProductService)
  messageService = inject(MessageService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  artistDetails!: IUser
  latestProducts: IProduct[] = []
  popularArtist: IUser[] = []

  ngOnInit(): void {
    this.getAllArtist()
    this.route.params.subscribe((params) => {
      const id = params['id']
      this.getArtist(id)
      this.getArtistProduct(id)
    })
  }

  // Artist based APIs 
  getArtist(id: string) {
    this.userService.getUserById(id).subscribe({
      next: (res: any) => {
        this.artistDetails = res.user
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to fetch artist data', life: 3000})
        console.error(err.message)
      }
    })
  }

  getArtistProduct(id: string) {
    this.productService.getProductByArtistId(id).subscribe({
      next: (res: any) => {
        this.latestProducts = res.product
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to fetch artist products', life: 3000})
        console.error(err.message)
      }
    })
  }

  getAllArtist() {
    this.userService.getAllArtist().subscribe({
      next: (res: any) => {
        this.popularArtist = res.user
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to fetch artists', life: 3000})
        console.error(err.message)
      }
    })
  }

  //Params based router
  viewProduct(id: string | undefined) {
    this.router.navigate(['/products', id])
  }

  viewArtist(id: string | undefined) {
    this.router.navigate(['/artist', id])
  }

}
