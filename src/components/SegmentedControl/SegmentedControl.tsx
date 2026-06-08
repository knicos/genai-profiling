import { styled, ToggleButtonGroup, ToggleButton } from "@mui/material";

export const SegmentedControl = styled(ToggleButtonGroup)({
    width: 'fit-content',
    backgroundColor: '#b9bec8',
    borderRadius: '8px',
    padding: '5px',
    gap: '5px',
}); 

export const SegmentedControlButton = styled(ToggleButton)({
    textTransform: 'none',
    color: '#444',
    border: 'none',
    fontWeight: 'bolder',
    gap: '5px',
    borderRadius: '8px !important',
    transition: 'background-color 0.2s, color 0.2s, box-shadow 0.2s',
    '&.Mui-selected': {
        backgroundColor: 'var(--background)',
        color: 'var(--primary-verydark)',
        boxShadow: '0px 2px 4px var(--dropShadow)',
        '&:hover': {
            backgroundColor: 'var(--background)',
        }
    },
    '&:not(.Mui-selected):hover': {
        Opacity: 0.8,
    }
});