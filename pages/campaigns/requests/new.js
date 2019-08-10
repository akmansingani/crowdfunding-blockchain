import React,{ Component } from 'react';
import { Card,Button, Form, Input,Message } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import Layout from '../../../components/layout';
import { Link,Router } from '../../../routes';
import web3 from '../../../ethereum/web3';

class RequestNew extends Component {

    state = {
        value:'',
        description:'',
        receipient:'',
        errorMessage:'',
        loading:false
    };


    static async getInitialProps(props){

        const caddress = props.query.address;
      
        return {
          address : caddress
        };
  
      }
    

      onSubmit = async event  => {

        this.setState({errorMessage:''});

        console.log("submit clicked");

        event.preventDefault();

        this.setState({loading:true});

        try{

            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(this.props.address);
            const {description,value,receipient} = this.state;

           await campaign.methods
            .createRequest(description, web3.utils.toWei(value, 'ether'), receipient)
            .send({
                from: accounts[0]
            });

            // redirec to campaign page
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);

        }
        catch(err){
            this.setState({errorMessage:err.message});
        }
        
        this.setState({loading:false});

    }

    

    render() {
        return( 
            <Layout>

                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>


                <h3>Create New Requests</h3>
               
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

                    <Form.Field>
                        <label>Description</label>
                        <Input 
                         value={this.state.description}
                         onChange={event => this.setState({ description : event.target.value })} />
                    </Form.Field>

                     <Form.Field>
                        <label>Value in Ether</label>
                        <Input 
                         value={this.state.value}
                         onChange={event => this.setState({ value : event.target.value })} />
                    </Form.Field>

                     <Form.Field>
                        <label>Receipient</label>
                        <Input 
                         value={this.state.receipient}
                         onChange={event => this.setState({ receipient : event.target.value })} />
                    </Form.Field>

                     <Message error
                        header="Error!"
                        content={this.state.errorMessage}>
                     </Message>
                    <Button type='submit' 
                    disabled={this.state.loading} 
                    loading={this.state.loading} primary>Create Request!</Button>


                </Form>

            </Layout>
         );
    };
}

export default RequestNew;