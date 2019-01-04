import React, { Component } from 'react';
import axios from '../../axios';
import './StoriesWidget.scss';
import Story from '../../components/Story/Story';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
class StoriesWidget extends Component {

  state = {
    stories: null,
    currentStory: null,
    mobile: false
  }

  /**
  * Calculate & Update state of new dimensions
  */
  updateDimensions = () => {
    if(this.state.currentStory){
    console.log('this.state.currentStory.index '+ this.state.currentStory.index)
    console.log('this.state.stories.length '+ this.state.stories.length)
    }
    if (window.innerWidth < 520) {
      console.log('called')
      console.log('mobile ' + window.innerWidth);
      this.setState({mobile: true});
    } else {
      console.log('desktop');
      this.setState({mobile: false});
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

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
          stories: updatedStories,
          currentStory: updatedStories[0]
        });
      })
      .catch(err => {
        console.log('err', err)
      });
  }

  nextStory = (index) => {
    let decrement = this.state.mobile ? 1 : 2; 

    if (index === this.state.stories.length - decrement) {
      return false;
    }
    const newIndex = this.state.currentStory.index + 1;
    this.setState({
      currentStory: this.state.stories[newIndex]
    })
  }

  prevStory = (index) => {
    if (index === 0) {
      return false;
    }

    const newIndex = this.state.currentStory.index - 1;
    this.setState({
      currentStory: this.state.stories[newIndex]
    })
  }

  render() {
    if (!this.state.stories) {
      console.log(this.state)
      return 'loading...';
    }
    else {
      const { stories, currentStory } = this.state;
      
      return (
        <React.Fragment>
          <IoIosArrowForward className="NextBtn"
            onClick={() => this.nextStory(currentStory.index)}
          ></IoIosArrowForward>
          <IoIosArrowBack className="PrevBtn"
            onClick={() => this.prevStory(currentStory.index)}
          ></IoIosArrowBack>

          <div className="StoriesWrapper">
            <div className={"StoriesSlider"}>
              <div className="StoriesSliderWrapper" style={{
                'transform': `translateX(-${currentStory.index * (100 / stories.length)}%)`
              }}>
                {stories.map(story => <Story
                  key={story.id}
                  story={story}
                />)}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default StoriesWidget;