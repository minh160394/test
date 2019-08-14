import React, { Component } from 'react';
import './Dashboard.scss';
import {getuserBalance,getuserTransacionHistory} from '../../actions/index';
import {connect} from 'react-redux';
import { LeftSidebar,GUpdateModal ,TransferModal,DepositModal,WithDrawModal, DoughnutChart, LineChart, ChartTable, TransactionTable, Footer } from './../../components';

class Dashboard extends Component{
    componentWillMount(){
        this.props.getuserBalance(this.props.username);
        this.props.getuserTransacionHistory(this.props.username);
   
    };
    componentWillUnmount(){
        console.log("unmount");
    };
  
    render(){
         return (
            <div className="dashboard-container">
                <div className="navigation">
                    <LeftSidebar/>
                </div>
                <div className="content-wrapper" id="content-div">
                    <div className="overview-container">
                        <div className="overview-table"><ChartTable/></div>
                        <div className="overview-graph"><DoughnutChart /></div>
                    </div>
                    <div className="graph-container"><LineChart /></div>
                    <div className="table-container"><TransactionTable /></div>
                    <div className="transfer-modal-container container">
                        <div className="row justify-content-around">
                            <div className="transfer-modal-container-item ">
                                <WithDrawModal/>
                            </div>                     
                            <div className="transfer-modal-container-item right">
                                <DepositModal/>
                            </div>
                        </div>    
                        <div className="row justify-content-around">
                            <div className="transfer-modal-container-item  ">
                                <TransferModal/>
                            </div>
                            <div className="transfer-modal-container-item right">
                                <GUpdateModal/>
                            </div>
                        </div>
                    </div>
                    <div className="footer-container"><Footer/></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        username : state.UserStore.userId,
    }
}
export default connect(mapStateToProps,{getuserBalance,getuserTransacionHistory})(Dashboard);
