import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Currency } from '@/entities/Currency/testing';
import { Country } from '@/entities/Country/testing';
import { Profile } from '@/entities/Profile/testing';
import { $api } from '@/shared/api/api';

import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const name = 'admin';
const profile: Profile = {
  id: '1',
  first: name,
  lastname: name,
  age: 465,
  currency: Currency.USD,
  country: Country.Armenia,
  city: 'Erevan',
  username: 'xaker',
};
const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: '1' },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('features/EditableProfileCard', () => {
  beforeEach(() => {
    componentRender(<EditableProfileCard id="1" />, options);
  });

  test('the readonly mode must switch', async () => {
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton'),
    ).toBeInTheDocument();
  });

  test('when cancelled, the values should be reset to zero', async () => {
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    const firstnameInput = screen.getByTestId('ProfileCard.firstname');
    const lastnameInput = screen.getByTestId('ProfileCard.lastname');
    const value = 'user';

    await userEvent.clear(firstnameInput);
    await userEvent.clear(lastnameInput);

    await userEvent.type(firstnameInput, value);
    await userEvent.type(lastnameInput, value);

    expect(firstnameInput).toHaveValue(value);
    expect(lastnameInput).toHaveValue(value);

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.CancelButton'),
    );
    expect(firstnameInput).toHaveValue(name);
    expect(lastnameInput).toHaveValue(name);
  });

  test('an error should appear', async () => {
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    const firstnameInput = screen.getByTestId('ProfileCard.firstname');

    await userEvent.clear(firstnameInput);
    expect(firstnameInput).toHaveValue('');

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton'),
    );

    expect(
      screen.getByTestId('EditableProfileCard.Error.Paragraph'),
    ).toBeInTheDocument();
  });

  test('if there are no validation errors, then a put request should go to the server', async () => {
    const mockPutReq = jest.spyOn($api, 'put');

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    const firstnameInput = screen.getByTestId('ProfileCard.firstname');
    const value = 'user';

    await userEvent.clear(firstnameInput);
    await userEvent.type(firstnameInput, value);
    expect(firstnameInput).toHaveValue(value);

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton'),
    );

    expect(
      screen.queryByTestId('EditableProfileCard.Error.Paragraph'),
    ).not.toBeInTheDocument();
    expect(mockPutReq).toHaveBeenCalled();
  });
});
