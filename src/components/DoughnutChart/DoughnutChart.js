import React, { Component } from 'react';
import { Doughnut, Chart} from 'react-chartjs-2';
import {connect} from 'react-redux';
import './DoughnutChart.scss';
import 'chartjs-plugin-piechart-outlabels';
class DoughnutChart extends Component {

    render()
    {       
        let data = this.getData(this.props.invests);
        this.MidTitle();
        return (
            <div className="doughnut-container">
                <div className="doughnut-wrapper">
                    <Doughnut
                        data={data}
                        width={500}
                        height={500}
                        options={this.getOptions(this.props.invests)}
                        legend={this.getLegend()}
                    />
                </div>
            </div>
        );
    };
    MidTitle(){
                var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
                Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
                draw: function() {
                originalDoughnutDraw.apply(this, arguments);
                var chart = this.chart.chart;
                var ctx = chart.ctx;
                var width = 600;
                var height = 500;
                var fontSize = (90 / 114).toFixed(2);
                ctx.font = fontSize + "em Verdana";
                ctx.textBaseline = "middle";
                var text = chart.config.data.text,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;
                ctx.fillText(text, textX, textY);
            }
            });
    }

    getData(data){
        return {
            datasets: [{
                data: Object.values(data),
                backgroundColor: Object.values(this.getLabelsAndColors(data))
            }],
            labels: Object.keys(this.getLabelsAndColors(data)),
            text: "Total investment"
        };
    };
    getOptions(data){  
        return {
            layout: {
                padding: {
                    left: 120,
                    right: 120,
                    top: 50,
                    bottom: 50
                }
            },
              maintainAspectRatio: true,
              zoomOutPercentage: 45,
              plugins: {
                outlabels: {
                    stretch: 50,
                    border: '',
                    display: 'auto',
                    color: Object.values(this.getLabelsAndColors(data)),
                    lineWidth: 3,
                    padding: 5,
                    textAlign: "center",
                    backgroundColor:'white',
                    text:'%l \n $%v CAD',
                    font: {
                        minSize: 12,
                        maxSize: 18
                    }
                }
            }
        }
    };
    getLegend(){
        return {
            display: false
        };
    };
    getLabelsAndColors(data) {
        const labels = new Object();
             Object.keys(data).map(e => {
                 switch (e){
                    case "BTC":
                        return  labels["Lending Bot"] = "#2F4858" ;
                    case "CLAM":
                        return  labels["Clam Minner"] = "#4D96CC";
                    case "CAD":
                        return labels["Canadian Stocks"] = "#8ADB92";
                    case "IOT":
                        return labels["Crypto-Games"]= "#33658A";
                    case "GOLD":
                        return labels["Gold"]= "#E8E288";
                    case "Stocks":
                        return labels["Stocks"]= "#DEA16F";
                    default:
                        break;
                }
            return " ";
        });
        return labels;
    }
}
const mapStateToProps = (state) => {
    return {
        invests: state.investment,
    }
}
export default connect(mapStateToProps)(DoughnutChart);
