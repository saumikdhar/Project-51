import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavItems } from './NavItems';
import NavItem from './NavItem/NavItem';

configure({ adapter: new Adapter() });

describe('NavItems', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems />);
  });

  it('should show two NavItem element if user is not Authorised', () => {
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });

  it('should show four NavItem element if user is Authorised and they are a manager', () => {
    wrapper.setProps({ isAuthorise: true, role: 'manager' });
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });

  it('should show three NavItem element if user is Authorised and they are a member of the Transformation Team', () => {
    wrapper.setProps({ isAuthorise: true, role: 'transformationTeam' });
    expect(wrapper.find(NavItem)).toHaveLength(4);
  });

  it('should show logout NavItem element if user is Authorised', () => {
    wrapper.setProps({ isAuthorise: true });
    expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(true);
  });
});
