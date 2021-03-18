export abstract class CommonListingTable {

    protected visibleProperties: any;
    protected allItems: Array<any>;
    protected commonProperties: {
        searchFilter: string,
        nbrEntries: number,
        pageCount: number,
        currentPage: number,
        lastpage: number,
        startIndex: number,
        endIndex: number,
    
        sizeFilteredArray: number
    };


    constructor() { 
        this.allItems = new Array();
        this.visibleProperties = [];
        this.commonProperties = {
            searchFilter: '',
            nbrEntries: 10,
            pageCount: 1,
            currentPage: 1,
            lastpage: 1,
            startIndex: 0,
            endIndex: 10,
            sizeFilteredArray: 0
        }
    }

    compare(obj1: any, obj2: any, index: number) : number {
        if(this.getNestedValue(obj1, this.visibleProperties[index].name) > this.getNestedValue(obj2, this.visibleProperties[index].name))
          return 1;
    
        if(this.getNestedValue(obj2, this.visibleProperties[index].name) > this.getNestedValue(obj1, this.visibleProperties[index].name))
          return -1;
        
        return 0;
    }
    
    sortByAscendingDescendingOrder(index: number){
        if(this.visibleProperties[index].sorted){
            this.allItems.sort((item1, item2) => (-1)*this.compare(item1, item2, index));
            this.visibleProperties[index].sorted = false;
        }
        else{
            this.allItems.sort((item1, item2) => (1)*this.compare(item1, item2, index));
            this.visibleProperties[index].sorted = true;
        }
    }
    
    getNestedValue(obj: any, key : any): any{
        return key.split(".").reduce(function(result: any, key: any) {
            return result[key] 
        }, obj);
    }
    
    stageHasAllKeywords(stage: any, str: string[]): boolean {
        const keywords = str.filter(e => e).map(v => v.toLowerCase());

        let row = new Array();
        
        this.visibleProperties.forEach((prop: any) => {
            row.push(this.getNestedValue(stage, prop.name));
        });
        
        return keywords.every(word => row.join(' ').toLowerCase().includes(word));
    }
    
    printStages() : any {
        let filteredArray = this.allItems.filter(x => {
            if (this.stageHasAllKeywords(x, this.commonProperties.searchFilter.trim().split(/\s+/))) return x;
        });

        console.log('ok : ');
        console.log(filteredArray);

        this.commonProperties.sizeFilteredArray = filteredArray.length;
        this.commonProperties.pageCount = Math.ceil(filteredArray.length / this.commonProperties.nbrEntries);
        
        if(this.commonProperties.currentPage > this.commonProperties.pageCount){
            this.commonProperties.currentPage = 1;
            this.commonProperties.startIndex = 0;
            this.commonProperties.endIndex = this.commonProperties.startIndex+this.commonProperties.nbrEntries;
        }

        return filteredArray.slice(this.commonProperties.startIndex, this.commonProperties.endIndex);
    }
        


}
