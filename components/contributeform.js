import React,{ Component } from 'react';
import { Form,Button, Input,Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';


class Contributeform extends Component {

    state = {
        amountContributed:'',
        errorMessage:'',
        loading:false
    };

     onSubmit = async event  => {

        this.setState({errorMessage:''});

        console.log("submit clicked : " + this.state.amountContributed);

        event.preventDefault();

        this.setState({loading:true});

        try{

            const accounts = await web3.eth.getAccounts();

            const campaign = Campaign(this.props.address);

            await campaign.methods
            .contribute()
            .send({
                from:accounts[0],
                value : web3.utils.toWei(this.state.amountContributed, 'ether') ,
            });

            // redirec to campaign page
            Router.replaceRoute(`/campaigns/${this.props.address}`);

        }
        catch(err){
            this.setState({errorMessage:err.message});
        }
        
        this.setState({loading:false});

    }

    render() {
        return(

             <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

                    <Form.Field>
                        <label>Amount to Contribute</label>
                        <Input label="ether" 
                        style={{width:"300px"}}
                        labelPosition="right"
                        value={this.state.amountContributed}
                        onChange={event => this.setState({ amountContributed : event.target.value })} />
                    </Form.Field>

                    <Message error
                        header="Error!"
                        content={this.state.errorMessage}>
                     </Message>
                    <Button type='submit' 
                    disabled={this.state.loading} 
                    loading={this.state.loading} primary>Contribute!</Button>

            </Form>
           
           
    
        );
    };

};

export default Contributeform;