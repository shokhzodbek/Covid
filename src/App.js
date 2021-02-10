import {Card, MenuItem, Select,CardContent} from '@material-ui/core';
import React,{useState,useEffect} from 'react'
import './App.css';
import {FormControl} from '@material-ui/core'
import Infobox from './components/Infobox'
import Map from './components/Map';
import Table from './components/Table'
import {sortData,printState} from './util'
import Linegreaf from './components/Linegraf'
import {Line} from 'react-chartjs-2'
import 'leaflet/dist/leaflet.css'

function App() {

  const [data,setData] = useState([])
  const [countryInfo,setCountryInfo]= useState([])
  const [table,setTable] = useState([])
  const [country,setCountry] = useState('worldwide')
  const [mapCenter,setMapCenter]=useState({lat:34.23432,lng:-34.23434})
  const [mapZoom,setMapZoom] = useState(3)
  const [mapCountries,setMapCountries] = useState([])
  const [caseType,setCaseType] = useState("cases")
  
  useEffect(()=>{
   fetch("https://disease.sh/v3/covid-19/all")
   .then(res=>res.json())
   .then(data=>setCountryInfo(data)
)
  },[])

console.log(data)

  useEffect(()=>{
   const getCountry = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(res=>res.json())
      .then(data=>{
        const sort = sortData(data)
        setData(sort)
        setTable(sort)
        setMapCountries(data)

      })
        
      }
   getCountry()
  },[])
  console.log('My>>>>')
 
  console.log(data)

  const onCountrChange = async(event)=>{
    const countryCode = event.target.value;
   
    setCountry(countryCode)

    const url = countryCode ==='worldwide'
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
    .then(res=>res.json())
    .then(data=>{
       setCountry(countryCode)
       setCountryInfo(data)
       setMapCenter([data.countryInfo.lat,data.countryInfo.long])
       setMapZoom(4)
    })
  }
  console.log(">>>>>?",mapCenter)

  return (
    <div className="app">
     <div className="app_left">
     <div className="app_header">
      <h2>Covid-19</h2>
      <FormControl className="app_dropdown">
        <Select
        onChange={onCountrChange}
        variant="outlined"
        value={country}
        >
          <MenuItem value="worldwide">worldwide</MenuItem>
          {data.map((item)=> <MenuItem value={item.country}>{item.country}</MenuItem>)}
        </Select>
      </FormControl>
      </div>
      <div className="app_state">
        <Infobox onClick={e=>setCaseType('cases')} title="Coronavirus Cases" total={countryInfo.cases} cases={printState(countryInfo.todayCases)}/>
        <Infobox onClick={e=>setCaseType('recovered')} title="Recovered" total={countryInfo.recovered} cases={printState(countryInfo.todayRecovered)}/>
        <Infobox onClick={e=>setCaseType('deaths')} title="Deaths" total={countryInfo.deaths} cases={printState(countryInfo.todayDeaths)} />
      </div>
      
          <Map casesType={caseType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
     </div>
     <div className="app_right">
       <Card>
         <CardContent>
           <h3>Live cases by Country</h3> 
           <Table countries={table}/>
           <h3>Worldwide new cases</h3>
         </CardContent>
       </Card>
     
     </div>
    
    </div>
  );
}

export default App;
