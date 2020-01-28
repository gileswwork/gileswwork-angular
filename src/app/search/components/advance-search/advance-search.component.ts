import { Component, OnInit, LOCALE_ID, Inject, Input } from '@angular/core'
import { PlatformInfoService } from 'src/app/core'
import { LOCALE } from '../../../../locale/messages.dynamic.en'
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss'],
})
export class AdvanceSearchComponent implements OnInit {
  @Input() searchValues
  isAPhoneScreen = false
  showAdvanceSearch = false
  ngOrcidSearchInstitutionNamePlaceholder =
    LOCALE['ngOrcid.search.institutionNamePlaceholder']
  advanceSearch = new FormGroup({
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    institution: new FormControl('', []),
    keyword: new FormControl('', []),
    otherFields: new FormControl('', []),
    orcid: new FormControl('', [Validators.required]),
  })

  constructor(
    _platform: PlatformInfoService,
    @Inject(LOCALE_ID) private locale: string,
    private router: Router
  ) {
    _platform.get().subscribe(data => {
      this.isAPhoneScreen = data.columns4
    })
  }

  ngOnInit() {
    // If the search query is empty or it has advance search parameter values
    // it opens the advance search by default
    if (
      !Object.keys(this.searchValues).length ||
      this.searchValues['searchQuery'] == null
    ) {
      this.showAdvanceSearch = true
      this.advanceSearch.setValue(this.searchValues)
    }
  }

  toggleAdvanceSearch() {
    this.showAdvanceSearch = !this.showAdvanceSearch
    this.tempFixForOutlineFormInputCalculation()
  }

  search() {
    this.router.navigate(['/orcid-search/search'], {
      queryParams: this.advanceSearch.value,
    })
  }

  // tslint:disable-next-line: member-ordering
  tempFixForOutlineFormInputCalculationIssue_Direction = 'ltr'
  tempFixForOutlineFormInputCalculation() {
    // This is a temporal way to fix an MatFormField issue
    // that does not allow the correct calculation for the border gap on the outline form inputs on RTL languages.
    //
    // This function, SCSS overwrites on `src\assets\scss\material.orcid.overwrites.scss\form-field-outline.scss`,
    // and the template of this component should be clean once angular releases the fix.
    //
    // More info about this issue on
    // https://github.com/angular/components/issues/17390

    if (this.locale === 'ar') {
      if (this.showAdvanceSearch) {
        setTimeout(() => {
          // Applies RTL direction just after MatFormField was loaded
          this.tempFixForOutlineFormInputCalculationIssue_Direction = 'rtl'
        }, 0)
      } else {
        // The components should be loaded with LTR styles for MatFormField to calculate the empty gap correctly
        this.tempFixForOutlineFormInputCalculationIssue_Direction = 'ltr'
      }
    }
  }
}
