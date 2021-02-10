import {Circle,Popup} from 'react-leaflet'
import React from 'react'
import numeral from 'numeral'
export const sortData =(data)=>{
      const sortedData =[...data]
      sortedData.sort((a,b)=>{
            if(a.cases>b.cases){
                  return -1;
            }
            else {
                  return 1
            }
      })
      return sortedData
}

const casesColor = {
      cases:{
            hex:"#cc1034",
            multipl:400
      },
      recovered:{
            hex:"#7dd71d",
            multipl:1000
      },
      deaths:{
            hex:"#fb4443",
            multipl:1500
      },

}
export const printState = (stat)=>{
    return(stat? `+${numeral(stat).format("0.0a")}`:stat)
}

export const showDataMap = (data,caseType="cases")=>{
   return(
         data.map(country=>(
               <Circle
               center={[country.countryInfo.lat,country.countryInfo.long]}
               fillOpacity={0.4}
                color={casesColor[caseType].hex}
                fillColor={casesColor[caseType].hex}
                radius={
                      Math.sqrt(country[caseType])*casesColor[caseType].multipl
                }

               >
                  {console.log("Dataaaaaaaaa",data)}
                     <Popup>
                           <div className="info_container">
                          <div className={'info_img'}
                          style={{backgroundImage:`url(${country.countryInfo.flag})`}}/>
                          <div>{country.country}</div>
                          <div>Cases {numeral(country.cases).format("0,0")}</div>
                          <div>Recovered {numeral(country.recovered).format("0,0")}</div>
                          <div>Deaths {numeral(country.deaths).format("0,0")}</div>
                          </div>
                     </Popup>

               </Circle>
            
         ))
   )

}