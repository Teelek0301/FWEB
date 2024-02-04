import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SignUp from '../signup_page';

const server = setupServer(
    rest.post('http://localhost:5050/coaches', (req, res, ctx) => {
        return res(ctx.json({ qr: 'sample_qr_code' }));
    }),
    rest.post('http://localhost:5050/excos', (req, res, ctx) => {
        return res(ctx.json({ qr: 'sample_qr_code' }));
    }),
    rest.post('http://localhost:5050/members', (req, res, ctx) => {
        return res(ctx.json({ qr: 'sample_qr_code' }));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders SignUp form', () => {
    const { getByLabelText } = render(<SignUp />);
    const input = getByLabelText('Name');
    expect(input).toBeInTheDocument();
});

test('validates password on form submission', async () => {
    const { getByLabelText, getByText, getByRole } = render(<SignUp />);
    const passwordInput = getByLabelText('Password');
    const submitButton = getByRole('button', { name: /submit/i });

    fireEvent.change(passwordInput, { target: { value: 'invalid' } });
    fireEvent.click(submitButton);

    const errorMessage = await waitFor(() => getByText(/Password must be 8 characters long/i));
    expect(errorMessage).toBeInTheDocument();
});

test('submits form and makes POST request when password is valid', async () => {
    const { getByLabelText, getByRole, getByText } = render(<SignUp />);
    const passwordInput = getByLabelText('Password');
    const submitButton = getByRole('button', { name: /submit/i });

    fireEvent.change(passwordInput, { target: { value: 'ValidPassword1!' } });
    fireEvent.click(submitButton);

    const qrCode = await waitFor(() => getByText(/QR Code/i));
    expect(qrCode).toBeInTheDocument();
});