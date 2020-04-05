import React from 'react';
import { TextField } from 'components';
import { shallow } from 'enzyme';

describe('TextField', () => {
    const onChange = jest.fn();

    it('Render a textfield', () => {
        const component = shallow(<TextField id="test" label='testing' onChange={onChange} />);

        expect(component).toHaveLength(1);
        expect(component).toMatchSnapshot();
    });
});