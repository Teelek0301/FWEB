import { render, fireEvent } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import SelectedCoach from '../selectedCoach_page';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

fetchMock.enableMocks();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '1' }),
    useNavigate: () => jest.fn(),
}));



describe('SelectedCoach', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders Coach component with correct props', async () => {
        fetch.mockResponseOnce(JSON.stringify({ _id: '1', name: 'John Doe', age: 30, belt: 'Black', achievement: 'Champion', height: '180cm', aboutMe: 'About John', title: 'Coach', matriculation_number: '12345' }));
        const { findByText, container } = render(<MemoryRouter initialEntries={['/SelectedCoach/1']}><Routes> <Route path="/SelectedCoach/:id" element={<SelectedCoach />}></Route></Routes></MemoryRouter>);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        console.log(container.innerHTML);
        expect(await findByText('Hello my name is John Doe!')).toBeInTheDocument();
        // Add more assertions for other props
    });


});