import { LightningElement, track } from 'lwc';
import getAll from '@salesforce/apex/AccountController.getAll';

const COLS = [
    { label: 'ID', fieldName: 'Id', editable: false },
    { label: 'Name', fieldName: 'Name', editable: false }
];

export default class AsyncDemo extends LightningElement {
    @track accounts;
    @track error;

    columns = COLS;

    connectedCallback() {
        getAll()
            .then(result => {
                console.log('1st then');
                this.accounts = result;
                /* or any other function that returns promise */
                return this.promiseFunc();
            })
            .then(value => {
                console.log('2nd then executes after 3 seconds , value: ' + value);
            })
            .catch(error => {
                this.error = error;
            })
    }

    promiseFunc() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('foo');
            }, 3000);
        });
    }

    // To make our code deployable with using async/await syntax we can use 3 approaches:

    // 1. Declare some async init() function and invoke it within connectedCallback() hook:
    // connectedCallback() {
    //     this.init();
    // }
    // async init() {
    //     try {
    //         this.accounts = await getAll();
    //         const value = await this.promiseFunc();
    //         console.log('2nd then executes after 3 seconds async, value:' + value);
    //     } catch (error) {
    //         this.error = error;
    //     } finally {
    //         this.isLoaded = true;
    //     }
    // }

    // 2. Invoke it anonymously as an IIFE:
    // connectedCallback() {
    //     (async () => {
    //         try {
    //             this.accounts = await getAll();
    //             const value = await this.promiseFunc();
    //             console.log('2nd then executes after 3 seconds async, value:' + value);
    //         } catch (error) {
    //             this.error = error;
    //         } finally {
    //             this.isLoaded = true;
    //         }
    //     })();
    // }

    // 3. Make our connectedCallback() lifecycle hook async
    // async connectedCallback() {
    //     try {
    //         this.accounts = await getAll();
    //         await this.errorPromise();
    //         const value = await this.promiseFunc();
    //         console.log('2nd then executes after 3 seconds async, value:' + value);
    //     } catch (error) {
    //         this.error = error;
    //     } finally {
    //         this.isLoaded = true;
    //     }
    // }
}