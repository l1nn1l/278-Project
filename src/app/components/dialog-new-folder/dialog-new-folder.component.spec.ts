import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogNewFolderComponent } from './dialog-new-folder.component';

describe('DialogNewFolderComponent', () => {
  let component: DialogNewFolderComponent;
  let fixture: ComponentFixture<DialogNewFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNewFolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogNewFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
