import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { ArrowRightCircle, ArrowLeftCircle, Github } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  ArrowRightCircle,
  ArrowLeftCircle,
  Github
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
