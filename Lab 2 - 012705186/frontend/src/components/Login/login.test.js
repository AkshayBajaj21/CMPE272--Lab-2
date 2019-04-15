import React from 'react';
import Login from './Login';
import { shallow } from 'enzyme';

describe('Login component',() => {
 it('starts with',() => {
const wrapper = shallow(<Login/ >);
const countState = wrapper.state().count
expect(countState).toEqual(0);
 })
})



