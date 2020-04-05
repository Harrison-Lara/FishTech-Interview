import React from 'react';
import { Button } from 'components';
import { shallow } from 'enzyme';

describe('Button', () => {
    const buttonClick = jest.fn();

    it('Render a button', () => {
        const component = shallow(<Button onClick={buttonClick}>Test</Button>);

        expect(component).toHaveLength(1);
        expect(component).toMatchSnapshot();
    });
});