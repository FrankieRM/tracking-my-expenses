import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { TmeSharedModule } from 'app/shared/shared.module';
import { TmeCoreModule } from 'app/core/core.module';
import { TmeAppRoutingModule } from './app-routing.module';
import { TmeHomeModule } from './home/home.module';
import { TmeEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    TmeSharedModule,
    TmeCoreModule,
    TmeHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    TmeEntityModule,
    TmeAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class TmeAppModule {}
