import { Pipe, PipeTransform } from '@angular/core'
import { ModalEmailComponent } from '../../../cdk/side-bar/modals/modal-email/modal-email.component'
import { ModalCountryComponent } from '../../../cdk/side-bar/modals/modal-country/modal-country.component'
import { ModalWebsitesComponent } from 'src/app/cdk/side-bar/modals/modal-websites/modal-websites.component'
import { ModalKeywordComponent } from 'src/app/cdk/side-bar/modals/modal-keyword/modal-keyword.component'
import { ModalPersonIdentifiersComponent } from 'src/app/cdk/side-bar/modals/modal-person-identifiers/modal-person-identifiers.component'
import { ModalNameComponent } from 'src/app/record/components/top-bar/modals/modal-name/modal-name.component'
import { ModalBiographyComponent } from 'src/app/record/components/top-bar/modals/modal-biography/modal-biography.component'

@Pipe({
  name: 'appPanelsCollapseAriaLabel',
})
export class AppPanelsCollapseAriaLabelPipe implements PipeTransform {
  transform(panelType: any, args?: any): string {
    if (panelType == 'employment') {
      return $localize`:@@shared.employmentCollapseAriaLabel:Collapse the Employment section`
    } else if (panelType == 'education' || panelType == 'qualification') {
      return $localize`:@@shared.educationQualificationCollapseAriaLabel:Collapse the Education and qualifications section`
    } else if (panelType == 'distinction' || panelType == 'invited-position') {
      return $localize`:@@shared.distinctionInvitedPositionCollapseAriaLabel:Collapse the Invited positions and distinction section`
    } else if (panelType == 'membership' || panelType == 'service') {
      return $localize`:@@shared.membershipServiceCollapseAriaLabel:Collapse the Membership and service section`
    } else if (panelType == 'funding') {
      return $localize`:@@shared.fundingServiceCollapseAriaLabel:Collapse the Funding section`
    } else if (panelType == 'works') {
      return $localize`:@@shared.workServiceCollapseAriaLabel:Collapse the Works section`
    } else if (panelType == 'peer-review') {
      console.log('in peer-review')
      return $localize`:@@shared.peerReviewServiceCollapseAriaLabel:Collapse the Peer review section`
    } else if (panelType == 'sub-peer-review') {
      return $localize`:@@shared.activityCollapseForAriaLabel:Collapse for`
    } else {
      return $localize`:@@shared.hideDetails:Hide details`
    }
  }
}
