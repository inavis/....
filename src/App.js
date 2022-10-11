import './App.css';
import { Fragment, useEffect, useState } from "react";
import socketClient from "socket.io-client";
import { HorizontalBarGraph } from './Components/HorizontalBarGraph';
import { LineChartComponent } from './Components/LineChart';
import { BarChartComponent } from './Components/BarChart';
import { Clock } from './Components/Clock';
import computer1 from "./assets/computer1.jpg";
import wallpaper from "./assets/wallpaper.jpg"
// import { SubCard } from './Components/SubCard';
// import { DonutChartComponent } from './Components/DonutChart';

const SERVER = "wss://computer-stats.herokuapp.com/";

function App() {
  const [data, setData] = useState("");
  const [cpufree, setCpuFree] = useState("");
  const [osData, setOsData] = useState("");
  const [memData, setMemData] = useState(0);

  const [detailsDisplay,setDetailsDisplay] = useState(false);
  const detailsStyle = detailsDisplay?{display:"block"}:{display:"none"};

  const [menuDisplay,setMenuDisplay] = useState(false);
  const menuDisplayStyle = menuDisplay?{display:"block"}:{display:"none"};


  useEffect(() => {
    var socket = socketClient(SERVER, { transports: ['websocket'] });
    socket.on('cpu', (cpuPercent) => {
      setData(currentData => [...currentData, cpuPercent])
    });

    socket.on('freeCpu', (cpuFreePer) => {
      setCpuFree(currentData => [...currentData, cpuFreePer])
    });

    socket.on("os-details", (os) => {
      setOsData(os);
    })

    socket.on("mem-details", (mem) => {
      setMemData(mem)
    })
  }, [])

  useEffect(() => {
    //make tooltip appear based on cursor
    if (document.getElementsByClassName('tooltiptext')) {
      var tooltiptext = document.getElementsByClassName('tooltiptext');
      for (let i = 0; i < tooltiptext.length; i++) {
        document.addEventListener('mousemove', fn, false);
        function fn(e) {
          tooltiptext[i].style.left = e.pageX + 'px';
        }
      }
    }
  }, [])

  //SCROLL POSOTION
  const [scrollPosition, setScrollPosition] = useState(0);
const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
};
useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);
  useEffect(()=>{
    if(scrollPosition!==0){
      document.getElementsByClassName("rose")[0].classList.add("rose-remove")
    }
  },[scrollPosition])
  console.log(window.innerHeight,window.screen.height)
  return (
    <div className="App bg-wrapper"  style={{ background: `url{${wallpaper}}`,height:`${window.screen.height*5}px` }}>
      <div className='rose'>CPU STATS</div>
      <div className='nav-bar flex-container'>
        <div>
          <img className='logo' src={computer1} alt="logo" onClick={()=>{
            setDetailsDisplay((prevState)=>!prevState);
            setMenuDisplay(false)
          }} />
        </div>
        <div className='hamburger-container' onClick={()=>{
          setMenuDisplay((prevState)=>!prevState);
          setDetailsDisplay(false);
        }}>
          <div className='hamburger'></div>
        </div>    
      </div>

    <div className='menu' style={menuDisplayStyle}>
      <a href="#tickSection" onClick={()=>setMenuDisplay(false)} className='text-white p-3 coffee'><h4>TICK/IDLE</h4></a>
      <a href="#cpuSection" onClick={()=>setMenuDisplay(false)}  className='text-white p-3 coffee'><h4>CPU USAGE/SYSTEM UP TIME</h4></a>
      <a href="#uptimeSection" onClick={()=>setMenuDisplay(false)}  className='text-white p-3 coffee'><h4>FREE CPU/PROCESS UP TIME</h4></a>
      <a href="#memorySection" onClick={()=>setMenuDisplay(false)}  className='text-white p-3 coffee'><h4>MEMORY</h4></a>
        </div>
      <div className='menu' style={detailsStyle}>
            <div className='py-2 px-4 coffee' style={{ borderBottom: "1px solid gray", fontWeight: "bold"}}><h4><span>OS DETAILS</span></h4></div>
            <div className='px-4 py-2 coffee'>{osData?.osip}</div>
            <div className='py-1 px-4 coffee'>{osData?.platform}</div>
            <div className='py-1 px-4 coffee'>{osData?.cpu} CPUs</div>
            <div className='py-1 px-4 coffee'>{osData?.osarch}</div>
            <div className='py-1 px-4 coffee'>{osData?.hostname}</div>
            <div className='pt-1 pb-3 px-4 coffee'>{osData?.ostype}</div>
          </div>

      <br></br><br></br><br></br>
      <div  id="tickSection">
      <br></br>
      </div>
      <div className="flex-container">
        <div className=" flex-child1">
          <div className='main-card'>
            <h4 className='title coffee'>CPU  total idle</h4>
            <div className='text-center pb-3 pt-3 value'>{osData.cpuavg?.totalIdle}</div>
          </div>
        </div>
        <div className=" flex-child1">
          <div className='main-card'>
            <h4 className='title coffee'>CPU avg idle</h4>
            <div className='text-center pb-3 pt-3 value'>{osData.cpuavg?.avgIdle}</div>
          </div>
        </div>
        <div className="flex-child1" >
          <div className='main-card'>
            <h4 className='title coffee'>cpu total tick</h4>
            <div className='text-center pb-3 pt-3 value'>{osData.cpuavg?.totalTick}</div>
          </div>
        </div>
        <div className="flex-child1" >
          <div className='main-card'>
            <h4 className='title coffee'>APU avg tick</h4>
            <div className='text-center pb-3 pt-3 value'>{osData.cpuavg?.avgTotal}</div>
          </div>
        </div>
      </div>
      <div  id="cpuSection">
      <br></br>
      </div>
      <div className="flex-container">
        <div className="flex-child-main" >
          {
            data ?
              <Fragment>

                <div className='main-card'>
                  <h4 className='title coffee'>CPU Usage</h4>
                  <LineChartComponent value={data} />
                </div>
              </Fragment> : ""
          }
        </div>
        <div className=" flex-child1">
          <div className='main-card' style={{ height: "480px" }}>
            <h4 className='title coffee'>System Up Time</h4>
            <div className='text-center pb-3 pt-3 display-4 text-white font-new'>{osData?.sysuptime}</div>
            <Clock background="white" border="gray" />
          </div>
        </div>

      </div>
      <div  id="uptimeSection">
      <br></br>
      </div>
      <div className="flex-container" >
        <div className='flex-child1'>
          <div className='main-card' style={{ height: "480px" }}>
            <h4 className='title coffee'>Process Up Time</h4>
            <div className='text-center pb-3 pt-3 display-4 value'>{osData?.processuptime ? osData?.processuptime.toFixed(3) : ""}</div>
            <Clock background="white" border="gray" />
          </div>
        </div>
        <div className="flex-child-main" >
          {
            cpufree ?
              <Fragment>
                <div className='main-card'>
                  <h4 className='title coffee'>Free CPU</h4>
                  <BarChartComponent value={cpufree} />
                </div>
              </Fragment> : ""
          }
        </div>
      </div>
      <div  id="memorySection">
      <br></br>
      </div>
      <div className='flex-container'>
        <div className=" flex-child-main">
          <Fragment>
            <div className='main-card text-center display-4'>
              <h4 className='title coffee'>Free Memory(MB)</h4>
              <div className='display-5 p-5 text-white font-new'>{memData?.freeMemMb}</div>
            </div>

            <div className='main-card text-center display-4'>
              <h4 className='title coffee'>Free Memory(%)</h4>
              <div className='display-5 p-5 text-white font-new'>{memData?.freeMemPercentage}</div>
              <HorizontalBarGraph width={memData !== null ? memData?.freeMemPercentage : "100%"} text="Free memory"
                value={memData?.freeMemMb} total={memData?.totalMemMb} />
            </div>
          </Fragment>
        </div>
        <div className='flex-child-main'>
          <Fragment>
            <div className='main-card text-center display-4'>
              <h4 className='title coffee'>Used Memory(MB)</h4>
              <div className='display-5 p-5 text-white font-new'>{memData?.usedMemMb}</div>
            </div>

            <div className='main-card text-center display-4'>
              <h4 className='title coffee'>Used Memory(%)</h4>
              <div className='display-5 p-5 text-white font-new'>{memData?.usedMemPercentage}</div>
              <HorizontalBarGraph width={memData !== null ? memData?.usedMemPercentage : "100%"} text="Used memory"
                value={memData?.usedMemMb} total={memData?.totalMemMb} />
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  );
}

export default App;