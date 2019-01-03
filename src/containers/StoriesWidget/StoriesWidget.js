import React, { Component } from 'react';
import axios from '../../axios';
import './StoriesWidget.scss';
import Story from '../../components/Story/Story';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';

class StoriesWidget extends Component {

  state = {
    properties: null,
    property: null
  }

  componentDidMount() {
    // axios.get('http://localhost:3000/data.json')
    axios.get('https://api.bllush.com/sandbox/get-stories-details.json')
      .then(res => {
        let updatedStories = [];
        updatedStories = res.data.data.stories.map((story, i) => {
          return {
            ...story,
            index: i
          }
        });

        this.setState({
          properties: updatedStories,
          property: updatedStories[0]
        })
      })
      .catch(err => {
        console.log('err', err)
      });
  }
  

  nextProperty = (index) => {
    if (index === this.state.properties.length - 2) {
      return false;
    }
    const newIndex = this.state.property.index + 1;
    this.setState({
      property: this.state.properties[newIndex]
    })
  }

  prevProperty = (index) => {
    if (index === 0) {
      return false;
    }

    const newIndex = this.state.property.index - 1;
    this.setState({
      property: this.state.properties[newIndex]
    })
  }

  render() {
    if (!this.state.properties) {
      return 'loading...';
    }
    else {
      const { properties, property } = this.state;
      return (
        <div className="App">


          <div className="page">
          <FaArrowCircleRight className="NextBtn"
                onClick={() => this.nextProperty(property.index)}
              ></FaArrowCircleRight>
              <FaArrowCircleLeft className="PrevBtn"
                onClick={() => this.prevProperty(property.index)}
              ></FaArrowCircleLeft>
            <div className="col">

              

              <div className={`Stories-slider active-slide-${property.index}`}>
                <div className="Stories-slider-wrapper" style={{
                  'transform': `translateX(-${property.index * (100 / properties.length)}%)`
                }}>

                  {
                    properties.map(property => <Story
                      key={property.id}
                      property={property}
                    />
                    )
                  }
                </div>
              </div>
            </div>

          </div>
        </div>
      );
    }
  }
}

export default StoriesWidget;