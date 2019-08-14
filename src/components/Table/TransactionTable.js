import React, { Component} from 'react';
import './Table.scss';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {connect} from 'react-redux';
import _ from 'lodash';
import ReactSearchBox from 'react-search-box'
class TransactionTable extends Component {
    state = {
        rows: 10,
        pagetotal: this.props.transhistory.length / 10
    }
    onChangeRows = e => {
        e.preventDefault()
        if( _.isEqualWith(e.target.value, '10'))
        this.setState({
            rows : e.target.value,
            pagetotal: this.props.transhistory.length / 10
        });
        if( _.isEqualWith(e.target.value, '25'))
        this.setState({
            rows : e.target.value,
            pagetotal: this.props.transhistory.length / 25
        });
        if( _.isEqualWith(e.target.value, '50'))
        this.setState({
            rows : e.target.value,
            pagetotal: this.props.transhistory.length / 50
        });
        if( _.isEqualWith(e.target.value, '100'))
        this.setState({
            rows : e.target.value,
            pagetotal: this.props.transhistory.length / 100
        });
    }
    onClickPage = e => {
     
        console.log(e.target);
    }
    render()
    {
     const data = this.props.transhistory;
     const columns = [{
       Header: 'Date',
       id: 'time',
       accessor: (data)=>{
           return _.split(data.time, ',', 1);
       }, // String-based value accessors!

    },{
        Header: 'Investment',
        id: 'type',
        accessor: (data) => {
            return _.startCase(data.type);
        },

    },{
        Header: 'Description',
        id: 'description',
       accessor: (data) => {
           return _.startCase(data.description);
       },
   },{
       Header: 'Amount',
       id: 'amount',
      accessor: (data) => {
          return _.round((data.amount), 3) ;
      },
  },{
       id: 'account_balance_cad',
       Header: 'Amount in CAD',
     accessor: (data) => {
         return '$' + _.round((data.account_balance_cad), 2) ;
     },
       }]
       return(
            <div className="transactiontable-container">
                <div className="reacttable-container">
                    <div className="transaction-container">
                        <div className="table-title">Transaction History</div>
                        <div className="table-filters">
                            <div>
                                <span>Shows </span>
                                <select onChange={this.onChangeRows} value={this.state.rows} >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                </select> <span> entries</span>
                            </div>
                       
                            <div className="search-container">
                                <ReactSearchBox
                                    placeholder="search"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                     
                        <ReactTable className="-striped"
                        data={data}
                        columns={columns}
                        pageSize={_.toNumber(this.state.rows)}
                        //page={}
                        showPagination={false}
                        />
                    </div>
                </div>

                            <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center" onClick={this.onClickPage}>
                <li className="page-item disabled">
                Previous</li>
                <li className="page-item" >1</li>
                <li className="page-item">2</li>
                <li className="page-item">3</li>
                <li className="page-item">4<a className="page-link">4</a></li>
                <li className="page-item"><a className="page-link">5</a></li>
                <li className="page-item"><a className="page-link">6</a></li>
                <li className="page-item"><a className="page-link">Next</a></li>
            </ul>
            </nav>
            </div>
            );
        }
}
const mapStateToProps = (state) => {
    return {
        transhistory: Object.values(state.transhistory),
    }
}
export default connect(mapStateToProps)(TransactionTable);
