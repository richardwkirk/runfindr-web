import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { TemplatePortal } from '@angular/cdk/portal';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit {

  helpIcon = faQuestionCircle;

  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;

  @ViewChild('helpOverlay', {static: false}) _dialogTemplate: TemplateRef<any>;

  constructor(private _overlay: Overlay,
              private _viewContainerRef: ViewContainerRef,
              private _auth: AuthService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
    this._overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  }

  showHelp() {
    this._overlayRef.attach(this._portal);
  }

  closeOverlay() {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }

}
