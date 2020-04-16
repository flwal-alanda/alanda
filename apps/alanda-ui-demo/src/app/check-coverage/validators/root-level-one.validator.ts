import {AbstractControl} from "@angular/forms";

export function rootLevelValidator1(rootFg: AbstractControl) {
  const formName = rootFg.get('pane2-dummy').get('name').value;
  const formStreet = rootFg.get('pane1-dummy').get('street').value;
  return formName !== 'Tom' || !formStreet ? {
    rootLevelValidator1: true
  } : null
}
