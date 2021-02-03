import React from 'react'
import { Card, CardContent } from '@material-ui/core'


function InfoBox2({ active, tests, critical }) {
    return (
        <Card className="infoBox">
        <CardContent>
            <h2 classname="infoBox__title">
                {active} Active Cases
            </h2>
            <h2 className="infoBox__cases" >
                {tests} Samples Collected
            </h2>
            <h2 className="infoBox__total">
                {critical} Critical Stage
            </h2>
        </CardContent>
    </Card>
    )
}

export default InfoBox2
