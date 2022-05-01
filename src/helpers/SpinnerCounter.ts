export default class SpinnerCounter{
    private counter: number = 0;

    private showSpinner(): boolean{
        return this.counter > 0;
    }

    public Increase(): boolean{
        this.counter++;

        return this.showSpinner();
    }

    public Decrease(): boolean{
        if (this.counter !== 0) {
            this.counter--;
        }
        
        return this.showSpinner();
    }
}