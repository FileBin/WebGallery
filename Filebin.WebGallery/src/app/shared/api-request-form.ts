import { HttpErrorResponse } from "@angular/common/http";
import { AbstractControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

export abstract class ApiRequestForm {
  public message = ''
  public loading = false

  public abstract get form(): AbstractControl;

  public abstract sendRequest(): Observable<void>;

  public onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.sendRequest().subscribe({
        error: (err: HttpErrorResponse) => {
          let detail = err.error?.detail;
          if (detail) {
            this.message = detail;
            return;
          }
          this.message = err.statusText;
        },
        complete: () => {
          this.message = "";
          this.onComplete();
        }
      })
      .add(
        () => this.loading = false
      );
  }

  public abstract onComplete(): void;
}