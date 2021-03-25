import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AssignUsers } from './AssignUsers';
import { Tag } from 'antd';

configure({ adapter: new Adapter() });

describe('<AssignUsers>', () => {
  let wrapper;

  beforeEach(() => {});

  it('should render Tag when receiving users', () => {
    const location = { pathname: '/projects/1' };
    wrapper = shallow(<AssignUsers users={[]} getProjectUsers={() => {}} location={location} />);
    wrapper.setProps({ users: [{ key: 1, firstName: 'Foo', surname: 'Bar' }] });
    expect(wrapper.find(Tag)).toHaveLength(1);
  });

  it('should render 2 Tags when adding another user to the project', () => {
    const location = { pathname: '/projects/1' };
    wrapper = shallow(
      <AssignUsers
        users={[{ key: 2, firstName: 'Foo 2', surname: 'Bar' }]}
        addUserToProject={{ users: [{ key: 1, firstName: 'Foo 1', surname: 'Bar' }] }}
        location={location}
      />
    );
    wrapper.setProps({
      users: [
        { key: 1, firstName: 'Foo 1', surname: 'Bar' },
        { key: 2, firstName: 'Foo 2', surname: 'Bar' }
      ]
    });
    expect(wrapper.find(Tag)).toHaveLength(2);
  });

  it('should render 1 Tag when removing a user from the project', () => {
    const location = { pathname: '/projects/1' };
    wrapper = shallow(
      <AssignUsers
        users={[
          { key: 1, firstName: 'Foo 1', surname: 'Bar' },
          { key: 2, firstName: 'Foo 2', surname: 'Bar' }
        ]}
        removeUserFromProject={(projectId, userId) => {
          projectId, userId;
        }}
        location={location}
      />
    );
    expect(wrapper.find(Tag)).toHaveLength(2);
  });
});
