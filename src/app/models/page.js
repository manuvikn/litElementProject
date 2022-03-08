export class Page {

    constructor(content, number) {

        this.totalPages = 0;
        this.number = number;
        this.first = false;
        this.last = false;
        this.firstPage = 0;
        this.lastPage = 0;     
        this.pageRegNumber = 10;   
        this.content = content;
        this.initVariables(content);

    }

    initVariables(content) {

        const lenContent = content.length;
        if ( lenContent < this.pageRegNumber ) {

            this.totalPages = 1;
            this.first = true;
            this.last = true;
            this.firstPage = 0;
            this.lastPage = lenContent - 1;
            
        } else {

            this.totalPages = Math.ceil( (lenContent / this.pageRegNumber) );
            this.first = (this.number == 0);
            this.last = ( this.number == (this.totalPages - 1) );
            this.firstPage = this.number * this.pageRegNumber;
            this.lastPage = this.firstPage + this.pageRegNumber;

        }

    }

}