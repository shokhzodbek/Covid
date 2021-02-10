import { Card,CardContent,Typography} from '@material-ui/core'
import React from 'react'
import numeral from 'numeral'
import './styles.css'
function Infobox({title,cases,total,...props}) {

      return (
            <div className="infobox">
                  <Card onClick={props.onClick} className={'card'}>
                        <CardContent>
                              <Typography className="title" color="textSecondary">
                                    {title}
                              </Typography>
                              <h2 className="cases">{cases}</h2>
                              <Typography className="total" color="textSecondary">
                                    {numeral(total).format("0.0a")} Total
                              </Typography>
                        </CardContent>

                  </Card>
                  
            </div>
      )
}

export default Infobox
