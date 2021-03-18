import { Component } from '@angular/core'

import { BaseStepDirective } from '../BaseStep'
import { PlatformInfoService } from 'src/app/cdk/platform-info'
import { first } from 'rxjs/operators'
import { Router } from '@angular/router'
import { ApplicationRoutes } from 'src/app/constants'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-step-a',
  templateUrl: './step-a.component.html',
  styleUrls: ['./step-a.component.scss'],
  preserveWhitespaces: true,
})
export class StepAComponent extends BaseStepDirective {
  constructor(private _platform: PlatformInfoService, private _router: Router) {
    super()
  }
  infoSiteBaseUrl =
    environment.INFO_SITE_TEMPORAL_WHILE_TRANSITIONING_TO_THE_NEW_INFO_WEBSITE

  goBack() {
    console.log('TRY TO GO BACK')
    this._platform
      .get()
      .pipe(first())
      .subscribe((platform) => {
        console.log('TRY TO GO BACK')

        if (platform.social) {
          this._router.navigate([ApplicationRoutes.social], {
            queryParams: {
              ...platform.queryParameters,
            },
          })
        } else if (platform.institutional) {
          this._router.navigate([ApplicationRoutes.institutionalLinking], {
            queryParams: {
              ...platform.queryParameters,
            },
          })
        } else {
          this._router.navigate([ApplicationRoutes.signin], {
            queryParams: {
              ...platform.queryParameters,
            },
          })
        }
      })
  }

  signIn() {
    this._platform
      .get()
      .pipe(first())
      .subscribe((platform) => {
        const params = JSON.parse(JSON.stringify(platform.queryParameters))
        if (params['email']) {
          delete params['email']
        }
        if (params['orcid']) {
          delete params['orcid']
        }

        if (params['show_login']) {
          delete params['show_login']
        }

        this._router.navigate([ApplicationRoutes.signin], {
          queryParams: {
            ...params,
          },
        })
      })
  }
}
