import React from 'react';
import Profile from '../Profile/Profile';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { mount } from 'enzyme';

it('renders error',()=>{
    const component=mount(<Profile id='101' role='S'></Profile> );
    expect(component).toMatchSnapshot();
    component.setState({name:'Colt Steele'});
    expect(component).toMatchSnapshot();
    component.unmount();
});


it('renders error',()=>{
    const component=mount(<Announcement cid='CMPE 202'></Announcement> );
    expect(component).toMatchSnapshot();
    component.unmount();
});

it('renders error',()=>{
    const component=mount(<Assignment cid='CMPE 202' ></Assignment> );
    expect(component).toMatchSnapshot();
    component.unmount();
});