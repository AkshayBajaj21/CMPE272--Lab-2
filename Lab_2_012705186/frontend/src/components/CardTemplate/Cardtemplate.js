import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import './Cardtemplate.css';
import Draggable, {DraggableCore} from 'react-draggable';

export class Cardtemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: "",
            name: "",
            term: ""
        }
    }
  render() {
    let colorTemp = ["https://ih1.redbubble.net/image.530527489.1466/flat,550x550,075,f.jpg",
        "https://www.solidbackgrounds.com/images/2560x1440/2560x1440-sea-blue-solid-color-background.jpg",
        "https://cdn.shopify.com/s/files/1/1011/0376/products/PastelBlue.jpg?v=1512940787"];
    return (
      <Draggable>
      <div>
        <Link to={`/course/${this.props.id}/info`}  className="cardlink">
          <Card className="cards searchcards">
              <img src = "https://www.sanjac.edu/sites/default/files/blue-color.jpg" alt="coursecard" className="cardcolor"/>
              <h5><span className="cardlink">{this.props.id}</span></h5>
              <h5><span className="cardlink">{this.props.name}</span></h5>
              <h6><span className="cardlink term">{this.props.term}</span></h6>
          </Card>
        </Link>
      </div>
      </Draggable>
    )
  }
}

export default Cardtemplate

