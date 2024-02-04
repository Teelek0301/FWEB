import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Login from '../Login';

const server = setupServer(
    rest.post('http://localhost:5050/coaches/login', (req, res, ctx) => {
        return res(ctx.json({ coach: 'sample_token', _id: 'sample_coach_id' }));
    }),
    rest.post('http://localhost:5050/excos/login', (req, res, ctx) => {
        return res(ctx.json({ exco: 'sample_token', _id: 'sample_exco_id' }));
    }),
    rest.post('http://localhost:5050/members/login', (req, res, ctx) => {
        return res(ctx.json({ member: 'sample_token', _id: 'sample_member_id' }));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('logs in as a coach', async () => {
    const { getByLabelText, getByRole, getByText } = render(<Login />);
    const nameInput = getByLabelText('Name');
    const passwordInput = getByLabelText('Password');
    const sixDigitCodeInput = getByLabelText('Six Digit Code On Google Authenticator');
    const coachRadioButton = getByLabelText('Coach');
    const submitButton = getByRole('button', { name: /login/i });

    fireEvent.change(nameInput, { target: { value: 'sample_name' } });
    fireEvent.change(passwordInput, { target: { value: 'sample_password' } });
    fireEvent.change(sixDigitCodeInput, { target: { value: '123456' } });
    fireEvent.click(coachRadioButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(localStorage.getItem('token')).toBe('sample_token');
        expect(sessionStorage.getItem('coach_id')).toBe('sample_coach_id');
        expect(window.location.href).toBe('/Members');
        expect(alert).toHaveBeenCalledWith('Login successful');
    });
});

test('logs in as an exco', async () => {
    const { getByLabelText, getByRole, getByText } = render(<Login />);
    const nameInput = getByLabelText('Name');
    const passwordInput = getByLabelText('Password');
    const sixDigitCodeInput = getByLabelText('Six Digit Code On Google Authenticator');
    const excoRadioButton = getByLabelText('Exco');
    const submitButton = getByRole('button', { name: /login/i });

    fireEvent.change(nameInput, { target: { value: 'sample_name' } });
    fireEvent.change(passwordInput, { target: { value: 'sample_password' } });
    fireEvent.change(sixDigitCodeInput, { target: { value: '123456' } });
    fireEvent.click(excoRadioButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(localStorage.getItem('token')).toBe('sample_token');
        expect(sessionStorage.getItem('exco_id')).toBe('sample_exco_id');
        expect(window.location.href).toBe('/Members');
        expect(alert).toHaveBeenCalledWith('Login successful');
    });
});

test('logs in as a member', async () => {
    const { getByLabelText, getByRole, getByText } = render(<Login />);
    const nameInput = getByLabelText('Name');
    const passwordInput = getByLabelText('Password');
    const sixDigitCodeInput = getByLabelText('Six Digit Code On Google Authenticator');
    const memberRadioButton = getByLabelText('Member');
    const submitButton = getByRole('button', { name: /login/i });

    fireEvent.change(nameInput, { target: { value: 'sample_name' } });
    fireEvent.change(passwordInput, { target: { value: 'sample_password' } });
    fireEvent.change(sixDigitCodeInput, { target: { value: '123456' } });
    fireEvent.click(memberRadioButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(localStorage.getItem('token')).toBe('sample_token');
        expect(sessionStorage.getItem('member_id')).toBe('sample_member_id');
        expect(window.location.href).toBe('/Members');
        expect(alert).toHaveBeenCalledWith('Login successful');
    });
});