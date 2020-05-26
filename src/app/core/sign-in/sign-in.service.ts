import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { ErrorHandlerService } from '../error-handler/error-handler.service'
import { environment } from '../../../environments/environment'
import { catchError, retry } from 'rxjs/operators'
import { SignIn } from '../../types/sign-in.endpoint'
import { Reactivation } from '../../types/reactivation.endpoint'
import { CustomEncoder } from '../custom-encoder/custom.encoder'
import { getOrcidNumber } from '../../constants'
import { SignInLocal, TypeSignIn } from '../../types/sign-in.local'

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private headers: HttpHeaders

  constructor(
    private _http: HttpClient,
    private _errorHandler: ErrorHandlerService
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
  }

  signIn(signInLocal: SignInLocal, type) {
    let loginUrl = 'signin/auth.json'

    if (signInLocal.type && signInLocal.type === 'institutional') {
      loginUrl = 'shibboleth/signin/auth.json'
    }

    let body = new HttpParams({ encoder: new CustomEncoder() })
      .set('userId', getOrcidNumber(signInLocal.data.username))
      .set('password', signInLocal.data.password)
    if (signInLocal.data.verificationCode) {
      body = body.set('verificationCode', signInLocal.data.verificationCode)
    }
    if (signInLocal.data.recoveryCode) {
      body = body.set('recoveryCode', signInLocal.data.recoveryCode)
    }
    body = body.set(
      'oauthRequest',
      signInLocal.type === TypeSignIn.oauth ? 'true' : 'false'
    )
    return this._http
      .post<SignIn>(environment.API_WEB + loginUrl,
        body,
        {
          headers: this.headers,
          withCredentials: true,
        })
      .pipe(
        retry(3),
        catchError((error) => this._errorHandler.handleError(error))
      )
  }

  reactivation(data) {
    let body = new HttpParams({ encoder: new CustomEncoder() })
    body = body.set('email', data.email)
    return this._http
      .post<Reactivation>(environment.API_WEB + `sendReactivation.json`, body, {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(
        retry(3),
        catchError((error) => this._errorHandler.handleError(error))
      )
  }
}
