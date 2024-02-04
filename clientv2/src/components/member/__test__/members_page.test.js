import { render} from '@testing-library/react';
import '@testing-library/jest-dom';
import Members from '../members_page';
import React from 'react';

jest.mock('react-router-dom', () => ({
  NavLink: 'div',
}));

jest.mock('../members_page.css', () => ({}));

describe('Members', () => {
  // Mock fetch function
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('fetch is called 3 times on render', () => {
    render(<Members />);
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  test('CoachList, ExcoList, and MemberList return correct number of components', () => {
    const { container } = render(<Members />);
    const coaches = container.querySelectorAll('.members-container Coach');
    const excos = container.querySelectorAll('.members-container Exco');
    const members = container.querySelectorAll('.members-container Member');

    expect(coaches.length).toBe(coaches.length);
    expect(excos.length).toBe(excos.length);
    expect(members.length).toBe(members.length);
  });

  test('NavLink in Coach, Exco, and Member have correct to prop', () => {
    const { container } = render(<Members />);
    const coachLinks = container.querySelectorAll('.members-container Coach NavLink');
    const excoLinks = container.querySelectorAll('.members-container Exco NavLink');
    const memberLinks = container.querySelectorAll('.members-container Member NavLink');

    coachLinks.forEach(link => {
      expect(link.getAttribute('to')).toBe(`/SelectedCoach/${link.props.coach._id}`);
    });

    excoLinks.forEach(link => {
      expect(link.getAttribute('to')).toBe(`/SelectedExco/${link.props.exco._id}`);
    });

    memberLinks.forEach(link => {
      expect(link.getAttribute('to')).toBe(`/SelectedMember/${link.props.member._id}`);
    });
  });
});