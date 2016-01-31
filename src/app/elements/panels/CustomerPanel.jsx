import { React } from 'libs/react'
import { PieChart, BarChart } from 'react-chartjs'
import { Well, Grid, Row, Col, Label, Panel, Button, ButtonGroup } from 'react-bootstrap'
import bindAll from 'lodash.bindall'

export class CustomerPanel extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }
  render() {
  return (
    <div>
    <SortExample />
    </div>
    )
  }
}




export class AnnualRevenueChart extends React.Component {
  constructor(props) {
    super(props)
    this.state =  {
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                fillColor: 'rgba(247, 70, 74, 1)',
                strokeColor: 'rgba(220,220,220,0.8)',
                highlightFill: 'rgba(220,220,220,0.75)',
                highlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                fillColor: 'rgba(70, 191, 189, 1)',
                strokeColor: 'rgba(151,187,205,0.8)',
                highlightFill: 'rgba(151,187,205,0.75)',
                highlightStroke: 'rgba(151,187,205,1)',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    },
    options: {
    }
    }

    bindAll(this, ['loadChartData'])
  }
  loadChartData() {

  }
  componentDidMount() {
    this.loadChartData()
    var legend = this.refs.chart.getChart().generateLegend()

    this.setState({
      legend: legend
    })
  }
  render() {
    var legend = this.state && this.state.legend || ''

    if(this.props.api)
      this.loadChartData()

  return (
    <Row>
    <Col lg={2}>
    <div className="pull-right" dangerouslySetInnerHTML={{ __html: legend }} />
    <BarChart ref="chart" data={this.state.data} options={this.state.options} />
    </Col>
    </Row>
    )
  }
}
AnnualRevenueChart.propTypes = { api: React.PropTypes.object }


export class OrderTypeChart extends React.Component {
  constructor(props) {
    super(props)
    this.state =  {
      data: [
      {
          value: 300,
          color:'#F7464A',
          highlight: '#FF5A5E',
          label: 'Box Office'
      },
      {
          value: 50,
          color: '#46BFBD',
          highlight: '#5AD3D1',
          label: 'Comp'
      },
      {
          value: 100,
          color: '#FDB45C',
          highlight: '#FFC870',
          label: 'Internet'
      }
    ],
    options: {
    }
    }

    bindAll(this, ['loadChartData'])
  }
  loadChartData() {
    var customerDetailsApi = this.props.api('customerdetails')
  customerDetailsApi.getOrderTypeChart({params:{customerId:1}}).then(
    function (data) {
       this.setState(data)
    }, function (error) {
      $log.error(error)
    })
  }
  componentDidMount() {
    //this.loadChartData()
    var legend = this.refs.chart.getChart().generateLegend()

    this.setState({
      legend: legend
    })
  }
  render() {
    var legend = this.state && this.state.legend || ''

    if(this.props.api)
      this.loadChartData()
  return (
    <Row>
    <Col lg={2}>
    <div className="pull-right" dangerouslySetInnerHTML={{ __html: legend }} />
    <PieChart ref="chart" data={this.state.data} options={this.state.options} />
    </Col>
    </Row>
    )
  }
}
OrderTypeChart.propTypes = { api: React.PropTypes.object }


