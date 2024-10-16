import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TopBarVerificationEmailComponent } from './top-bar-verification-email.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogModule as MatDialogModule,
} from '@angular/material/legacy-dialog'

import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar'
import { Overlay } from '@angular/cdk/overlay'

import { of } from 'rxjs'
import { ErrorHandlerService } from 'src/app/core/error-handler/error-handler.service'
import { RecordEmailsService } from 'src/app/core/record-emails/record-emails.service'
import { RecordService } from 'src/app/core/record/record.service'
import { PlatformInfoService } from '../platform-info'
import { SnackbarService } from '../snackbar/snackbar.service'
import { WINDOW_PROVIDERS } from '../window'

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

describe('TopBarVerificationEmailComponent', () => {
  let component: TopBarVerificationEmailComponent
  let fixture: ComponentFixture<TopBarVerificationEmailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, RouterTestingModule],
      declarations: [TopBarVerificationEmailComponent],
      providers: [
        WINDOW_PROVIDERS,
        {
          provide: RecordService,
          useValue: {
            getRecord: () => {
              return of({})
            },
          },
        },
        RecordEmailsService,
        PlatformInfoService,
        ErrorHandlerService,
        SnackbarService,
        MatSnackBar,
        MatDialog,
        Overlay,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarVerificationEmailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
