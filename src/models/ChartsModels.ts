export interface IStacked {
    width?: string;
    height?: string;
    currentMode?: string;
  }
  
export interface ISparkLine{
    id: string;
    height: string;
    width: string;
    color: string;
    data: any;
    type: any;
    currentColor: any;
  }

export interface IPie{
    id: string;
    data: any;
    legendVisiblity: boolean;
    height: string;
  }