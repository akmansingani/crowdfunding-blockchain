import React,{ Component } from 'react';
import { Button, Form, Grid, Table } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import Layout from '../../../components/layout';
import RequestRow from '../../../components/requestrow';
import { Link,Router } from '../../../routes';
import web3 from '../../../ethereum/web3';


class RequestIndex extends Component {

    static async getInitialProps(props){

        const caddress = props.query.address;
        const campaign = Campaign(caddress);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();
        const accounts = await web3.eth.getAccounts();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
            .fill()
            .map((element,index) => {
                return campaign.methods.requests(index).call();
            })
        );

        console.log(requests);

        return {
          requests : requests,
          address : caddress,
          requestCount : requestCount,
          approversCount : approversCount,
          currentAccount : accounts[0],
        };
  
      }
    
    renderRows()
    {
        return this.props.requests.map((request,index) => {

            return (
                <RequestRow 
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                    currentAccount ={this.props.currentAccount}
                />
            );


        });
    }

    render() {

        const { Header,Row,HeaderCell,Body } = Table;

        return( 
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}`}>
                    <a>Back</a>
                </Link>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                      <a>
                         <Button primary 
                         floated="right"
                         style={{marginBottom:"10px"}}
                         >Add Requests</Button>
                      </a>
                 </Link>

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount(ETH)</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>(<b>{this.props.requestCount}</b>) request found!</div>
            </Layout>
         );
    };
}

export default RequestIndex;