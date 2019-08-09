import React, { Component } from 'react';
import './GUpdateModal.scss';
import history from '../../history';
 
class DepositModal extends Component {
    state = {
        investment:'',
        amount: '',
        errinvestment:'',   
        erramount: '',
        submitbtn: ''
    }
    onChangeInvestment = e => {
        if(!e.target.value || e.target.value !== "investment"){
            this.setState({investment: e.target.value,
            errinvestment:''});
        }else{
            this.setState({
             investment: '',
             errinvestment:'* Error choose one'})
        }
        
    }
    onChangeAmount = e => {

        if(e.target.value.length <= 8){
            this.setState({amount: e.target.value, erramount:'' })
            if(!e.target.value){
                this.setState({amount: '',erramount:'* Error empty input'});
            }
        }
        else{
            this.setState({erramount:'* Error max 8'})
        }   
    }
    validationSubmit(){
        if(this.state.investment && this.state.amount){
            this.setState({submitbtn : true})
            history.push('/');
        }else{
            if(!this.state.investment)this.setState({errinvestment:'* Error choose one'});
            if(!this.state.amount)this.setState({erramount:'* Error empty input'});
            this.setState({submitbtn : false})
        }

    }
    onFormSubmit = event => { 
        event.preventDefault();
        this.validationSubmit();
        if(this.state.submitbtn){
           
        }else{
            console.log("go back");
        }
    };
  render(){
     
    return (
        <div className="transfer-container">
            <div className="transfer-form-wrapper">
                <div className="form">
                    <form onSubmit={this.onFormSubmit}>
                        <div className="form-group">
                            <input   value={this.state.amount} onChange={this.onChangeAmount}
                             className={`form-control + ${this.state.erramount !== '' ? 'error-mess' : ''}`}
                             type="number"  id="amount" placeholder="Amount"></input>
                            <div className="text-danger">{this.state.erramount}</div> 
                        </div>
                        <div className="form-group">
                            <select onChange={this.onChangeInvestment} value={this.state.investment} 
                            className={`form-control + ${this.state.errinvestment !== '' ? 'error-mess' : ''}`}>
                                <option value="investment">Investment</option>
                                <option value="ClamMiner">Clam Miner</option>
                                <option value="JustDice">Just-Dice</option>
                                <option value="LendingBot">Lending Bot</option>
                                <option value="Stocks">Stocks</option>
                                <option value="Gold">Gold</option>
                            </select>
                            <div className="text-danger">{this.state.errinvestment}</div>
                        </div>
                        <div>
                            <button type="submit" name="transfer" className="btn btn-info transfer-btn">Global Update</button>
                        </div>
                    </form>   
                </div>
            </div>
        </div>
    );
  }
}


export default DepositModal;
