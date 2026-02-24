import { provideRouter } from '@angular/router';
import { AppHeader } from './app-header';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe("AppHeader", () => {
    let fixture: ComponentFixture<AppHeader>;
    let component: AppHeader;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppHeader],
            providers: [
                provideRouter([]) // router minimal
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppHeader);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should logout correctly", () => {
        fixture.componentRef.setInput('isAuthenticated', true);
        fixture.detectChanges();
        const logoutSpy = vi.spyOn(component.closeEvent, "emit");

        const btn: HTMLButtonElement = fixture.nativeElement.querySelector('.logout');
        expect(btn).toBeTruthy();
        btn.click();

        expect(logoutSpy).toHaveBeenCalledWith(true);
        expect(logoutSpy).toBeCalledTimes(1);
    });

    it("should not display logout btn", () => {
        fixture.componentRef.setInput('isAuthenticated', false);
        fixture.detectChanges();

        const btn: HTMLButtonElement = fixture.nativeElement.querySelector('.logout');

        expect(btn).toBeNull();
    });

});