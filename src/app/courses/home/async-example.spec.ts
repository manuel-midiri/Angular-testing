import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe('Async Testing Examples', () => {
    it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
        let test = false;
        setTimeout(() => {
            console.log('running assetions');
            test = true;
            expect(test).toBeTruthy();
            done();
        }, 1000);
    });

    // Fake async Angular Test Utility
    it('Asynchronous test example - setTimeout()', fakeAsync(() => {
        let test = false;
        setTimeout(() => {
            
        });
        setTimeout(() => {
            console.log('running assetions setTimout()');
            test = true;
        }, 1000);

        flush();
        tick(1000);
        expect(test).toBeTruthy();

    }));

    // Promise base code
    it('Asynchronous test example - plain Promise', fakeAsync(() => {
        let test = false;
        Promise.resolve().then(() => {
            console.log('Promise first');
            test = true;
            return Promise.resolve();
        }).then(() => {
            console.log('Promise second');
        });
        flushMicrotasks();
        expect(test).toBeTruthy();
    }));

    // Mix micro-macro task (Promise)(setTimeout)
    it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {
        let counter = 0;
        Promise.resolve().then(() => {
            counter += 10;

            setTimeout(() => {
                counter += 1;
            }, 1000);
        });

        expect(counter).toBe(0);
        flushMicrotasks();
        expect(counter).toBe(10);
        tick(500);
        expect(counter).toBe(10);
        tick(500);
        expect(counter).toBe(11);
    }));

    // Use fackeAsync to Observable
    it('Asynchronous test example - Observables', fakeAsync(() => {
        let test = false;
        console.log('Creating Observable');

        const test$ = of(test).pipe(delay(1000));
        test$.subscribe(() => {
            test = true;
        });
        tick(1000);

        expect(test).toBe(true);
    }));
});