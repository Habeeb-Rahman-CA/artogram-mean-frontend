import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireArtistComponent } from './hire-artist.component';

describe('HireArtistComponent', () => {
  let component: HireArtistComponent;
  let fixture: ComponentFixture<HireArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HireArtistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HireArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
