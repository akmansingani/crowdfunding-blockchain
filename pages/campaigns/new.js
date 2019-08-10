import React,{ Component } from 'react';
import { Form,Button, Input,Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/layout';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';


class CampaignNew extends Component {

    state = {
        minimumContribution:'',
        errorMessage:'',
        loading:false
    };

     onSubmit = async event  => {

        this.setState({errorMessage:''});

        console.log("submit clicked : " + this.state.minimumContribution);

        event.preventDefault();

        this.setState({loading:true});

        try{

            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(this.state.minimumContribution)
            .send({
                from:accounts[0]
            });

            // redirec to campaign page
            Router.pushRoute('/');

        }
        catch(err){
            this.setState({errorMessage:err.message});
        }
        
        this.setState({loading:false});

    }

    render() {
        return(

            <Layout>
                <h3>Create new campaign!</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

                    <Form.Field>
                        <label>Min Contribution</label>
                        <Input label="wei" 
                        style={{width:"300px"}}
                        labelPosition="right"
                        value={this.state.minimumContribution}
                        onChange={event => this.setState({ minimumContribution : event.target.value })} />
                    </Form.Field>

                   <Message error
                   header="Error!"
                   content={this.state.errorMessage}>

                   </Message>
                    <Button type='submit' 
                    disabled={this.state.loading} 
                    loading={this.state.loading} primary>Create</Button>

                </Form>
            </Layout>
           
    
        );
    };

};

export default CampaignNew;