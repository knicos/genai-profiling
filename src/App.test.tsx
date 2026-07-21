import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Component as Start } from './views/Start/Start';
import { MemoryRouter } from 'react-router-dom';

describe('Start', () => {
    it('renders', async ({ expect }) => {
        render(
            <MemoryRouter initialEntries={['/start']}>
                <Start />
            </MemoryRouter>
        );
        await waitFor(() => {
            const elements = screen.getAllByText(/Enter Code/i);
            expect(elements.length).toBeGreaterThan(0);
        });
    });
});