import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from './App';

describe('App', () => {
    it('renders', async ({ expect }) => {
        render(<App />);
        const linkElement = screen.getByText(/Empty App/i);
        expect(linkElement).toBeInTheDocument();
    });
});
