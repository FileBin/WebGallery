import { ElementRef } from "@angular/core";

export class BaseField {
    constructor(private self: ElementRef<HTMLElement>) { }

    get value(): string | null {
        let inputs = this.self.nativeElement.getElementsByTagName('input');
        return inputs.item(0)?.value ?? null;
    }
}