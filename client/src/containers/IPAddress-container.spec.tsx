import React from 'react';
import { shallow } from 'enzyme';
import { IPAddress, validate } from './IPAddress-container';

describe('IPAddress', () => {
    it('Render the IPAddress container', () => {
        const component = shallow(<IPAddress />);

        expect(component).toHaveLength(1);
        expect(component).toMatchSnapshot();
    });

    it('validate with an empty value', () => {
        const emptyAddress = '';

        expect(validate(emptyAddress)).toEqual({ "address": "Invalid IP (Ex. 8.8.8.8)" })
        expect(validate(132)).toEqual({ "address": "Invalid IP (Ex. 8.8.8.8)" })
    });
});