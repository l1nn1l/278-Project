import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadFolderComponent } from './dialog-upload-folder.component';

describe('DialogUploadFolderComponent', () => {
  let component: DialogUploadFolderComponent;
  let fixture: ComponentFixture<DialogUploadFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUploadFolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogUploadFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
