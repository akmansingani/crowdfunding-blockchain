import React,{ Component } from 'react';
import { Card,Button, Icon, Grid } from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
import Layout from '../../components/layout';
import ContributeForm from '../../components/contributeform';
import { Link } from '../../routes';
import web3 from '../../ethereum/web3';

class CampaignShow extends Component {

    static async getInitialProps(props){

      const caddress = props.query.address;

      const campaign = Campaign(caddress);
     
      const summary = await campaign.methods.getSummary().call();

      return {
        minContribution : summary[0],
        balance : summary[1],
        requestsCount : summary[2],
        approversCount : summary[3],
        manager : summary[4],
        address : caddress
      };

    }

    renderCard()
    {
        const items = [
            {
                header : this.props.manager,
                meta : 'Manager Address',
                style : {overflowWrap :'break-word'}
            },
            {
                header : this.props.minContribution,
                meta : 'Minimum Contribution(WEI)',
                style : {overflowWrap :'break-word'}
            },
            {
                header : web3.utils.fromWei(this.props.balance,'ether'),
                meta : 'Campaign Balance (ETH)',
                style : {overflowWrap :'break-word'}
            },
            {
                header : this.props.requestsCount,
                meta : 'Total Requests',
                style : {overflowWrap :'break-word'}
            },
            {
                header : this.props.approversCount,
                meta : 'Total Contributors',
                style : {overflowWrap :'break-word'}
            }
        ]

        return <Card.Group items={items}></Card.Group>;
    };

    render() {

         return(
            <Layout>
                 <br/><br/>
              
               <div style={{fontSize:"20px"}}>Campaign : <b>{this.props.address}</b></div>

                <br/><br/>
             
                 <Grid>
                     <Grid.Row>
                            <Grid.Column width={10}>
                                {this.renderCard()}
                               
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <ContributeForm address={this.props.address} />
                            </Grid.Column>
                     </Grid.Row>
                     <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                        <a>
                                            <Button primary>View Requests</Button>
                                        </a>
                            </Link>
                        </Grid.Column>
                        


                    </Grid.Row>
                    
                </Grid>
               


            </Layout>

         );

    };

}

export default CampaignShow;

