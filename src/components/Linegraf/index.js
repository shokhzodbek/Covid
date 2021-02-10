import React,{useState,useEffect}from 'react'
import {Line} from 'react-chartjs-2'
function Linegreaf() {
      const [data,setData] = useState({})
      const buildChartData =(data,caseType="cases")=>{
            const chartData =[];
            let lastDataPoint;
            data.cases.forEach(date=>{
                  if(lastDataPoint){
                        const newDataPoint={
                              x:date,
                              y:data[caseType][data]-lastDataPoint
                        }
                       chartData.push(newDataPoint)
                  }
                  lastDataPoint=data[caseType][data]
            })
            return chartData
      }



      useEffect(()=>{
            fetch("http://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(res=>res.json())
            .then(data=>{
                  const chartData = buildChartData(data)
                  setData(chartData)
            })

       

      },[])
      console.log(data)
      return (

            <div className="linegraf">
            <Line data={{
                  datasets:[{data: data}]
            }}/>
                  <h1>Salom</h1>
            </div>
      )
}

export default Linegreaf
