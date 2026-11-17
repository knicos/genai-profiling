import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Component as Start } from './views/Start/Start';
import { MemoryRouter } from 'react-router';

//@genai-fi/base was opening too many files, which resulted in failed tests. 
vi.mock('@genai-fi/base', () => ({
    HomeBanner: () => <div>Home Banner</div>,
    LangSelect: () => <div>Language Select</div>,
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('Start', () => {
    it('renders', async ({ expect }) => {
        render(
            <MemoryRouter initialEntries={['/start']}>
                <Start />
            </MemoryRouter>
        );
        await waitFor(() => {
            const elements = screen.getAllByText(/existingPin/i);
            expect(elements.length).toBeGreaterThan(0);
        });
    });
});