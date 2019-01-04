import React, { Component } from 'react';
import axios from '../../axios';
import './StoriesWidget.scss';
import Story from '../../components/Story/Story';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
class StoriesWidget extends Component {

  state = {
    stories: null,
    currentStory: null
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
          stories: updatedStories,
          currentStory: updatedStories[0]
        })
      })
      .catch(err => {
        console.log('err', err)
      });
  }

  nextStory = (index) => {
    if (index === this.state.stories.length - 2) {
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
          <FaArrowCircleRight className="NextBtn"
            onClick={() => this.nextStory(currentStory.index)}
          ></FaArrowCircleRight>
          <FaArrowCircleLeft className="PrevBtn"
            onClick={() => this.prevStory(currentStory.index)}
          ></FaArrowCircleLeft>
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