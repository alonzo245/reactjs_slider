import React from 'react';
import './Story.scss';

const Story = ({ property }) => {
    const { index, story_title, cover_thumb_url, story_sub_title, link } = property;
    return (
        <div id={`Story-${index}`} className="Story">
            <img src={cover_thumb_url} alt={''} />
            <div className="StoryDetails">
                <div className="title">{story_title}</div>
                <p className="description">
                    {story_sub_title}
                </p>
                <a className="ReadStoryBtn" href={link}>Read Story</a>
            </div>
        </div>
    )
}


export default Story;