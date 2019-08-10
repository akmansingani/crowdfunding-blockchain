import React,{ Component } from 'react';
import { Card,Button, Icon } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
    
    static async getInitialProps(){

        const campaigns = await factory.methods.getDeployedCampaigns().call();
      
        return { campaigns }

    }

    renderCampaigns() {

        const items = this.props.campaigns.map( address => {
            return {
                header : address,
                description :  (
                    <Link route={`/campaigns/${address}`}>
                        <a>
                            View campaign
                        </a>
                    </Link>
                ),
                fluid : true
            };

        });
        return <Card.Group items={items}></Card.Group>;

    }

 /*   async componentDidMount()
    {
        const campaign = await factory.methods.getDeployedCampaigns().call();

        console.log(campaign);

    }*/

    


    render() {

        return(   
            <Layout>
                <div>
            
                    <h3>Open Campaigns</h3>

                     <Link route='/campaigns/new'>
                        <a>
                            <Button icon="add"
                                floated="right"
                                labelPosition='right' primary>
                                Create Campaign
                            </Button>
                        </a>
                    </Link>

                     {this.renderCampaigns()}

                    <br/><br/><br/>

                  
                
                </div>
            </Layout>
        );
        //return <div>Campaign Index! : { this.props.campaigns[0] } </div>
    }

}

export default CampaignIndex;


