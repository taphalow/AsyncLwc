import { LightningElement, track } from 'lwc';
import getAll from '@salesforce/apex/AccountController.getAll';

export default class AsyncDemo extends LightningElement {

    @track isLoaded = false;
    @track accounts;
    @track error;

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
            .finally(() => {
                this.isLoaded = true;
            });
    }

    promiseFunc() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('foo');
            }, 3000);
        });
    }
}