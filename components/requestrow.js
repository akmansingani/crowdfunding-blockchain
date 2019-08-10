import React,{ Component } from 'react';
import { Menu,Table,Button } from 'semantic-ui-react';
import { Router } from '../routes';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';


class RequestRow extends Component {

    state = {
        amountContributed:'',
        errorMessage:'',
        loading:false
    };

    onApprove = async event =>{

        console.log("approve clicked");

        try{
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(this.props.address);

            await campaign.methods
            .approveRequest(this.props.id)
            .send({
                from:accounts[0]
            });

        }
        catch(err){
            
        }
    }

    onFinalize = async event =>{

        console.log("finalize clicked");

        try{
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(this.props.address);

            await campaign.methods
            .finalizeRequest(this.props.id)
            .send({
                from:accounts[0]
            });

        }
        catch(err){
            console.log(err.message);
        }
    }


    render()
    {
        const { Row,Cell } = Table;
        const {id,request,approversCount,currentAccount} = this.props
        const readyForFinalize = request.approvalCount > approversCount / 2;

        return (
            <Row disabled={request.complete} positive={readyForFinalize && !request.complete}>
                <Cell>
                    {id + 1}
                </Cell>
                <Cell>
                    {request.description}
                </Cell>
                <Cell>
                    {web3.utils.fromWei(request.value, 'ether')}
                </Cell>
                <Cell>
                    {request.recipient}
                </Cell>
                <Cell>
                    {request.approvalCount}/{approversCount}
                </Cell>
                <Cell>
                    {
                        request.complete ? null : (
                            <Button color="green" basic 
                            onClick={this.onApprove}>
                                Approve
                            </Button>
                        )
                    }
                    
                </Cell>
                <Cell>

                     {
                        request.complete ? null : (
                            <Button color="teal" basic 
                            onClick={this.onFinalize}>
                                Finalize
                           </Button>
                        )
                    }


                   
                </Cell>
            </Row>
        );
    }
    


}


export default RequestRow;