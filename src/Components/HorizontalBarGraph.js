import { useEffect } from "react"

export function HorizontalBarGraph({width,text,value,total}){

    useEffect(()=>{
            //make tooltip appear based on cursor
    if(document.getElementsByClassName('tooltiptext')){
        var tooltiptext = document.getElementsByClassName('tooltiptext');
        for(let i=0;i<tooltiptext.length;i++){
            document.addEventListener('mousemove', fn, false);
            function fn(e) {
            tooltiptext[i].style.left = e.pageX + 'px';
            }
            }   
      }
  
    },[])
    return(
    <div style={{background:"rgb(104, 119, 226)"}} className="graph">
    <div className="year" style={{width:`${width}%`}}></div>
        <div className="tooltiptext">
        <div className="p-1">{`Total Memory`} 
          <div className='text-lt-blue'>{`${total} MB`}</div>
        </div>
        {/* <div className="p-1">{`${text} (%)`} 
          <div className='text-dk-blue'>{`${width}%`}</div>
        </div>  */}
        <div className="p-1">{`${text} (MB)`} 
          <div className='text-dk-blue'>{`${value} MB`}</div>
        </div>
        </div>
  </div>

    )
}