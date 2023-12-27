import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from './App';

describe('App', () => {
    it('renders', async ({ expect }) => {
        render(<App />);
        await waitFor(() => {
            const elements = screen.getAllByText(/Enter Code/i);
            expect(elements.length).toBeGreaterThan(0);
        });
    });
});
