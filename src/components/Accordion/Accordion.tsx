import ExpandMoreOutlined  from "@mui/icons-material/ExpandMoreOutlined";
import Delete from "@mui/icons-material/Delete"
import { styled, Box } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails';
import React, { useState } from "react";
import { IconButton } from "../Button/IconButton";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion
        disableGutters
        elevation={0}
        slotProps={{
            transition: {
                unmountOnExit: true,
                mountOnEnter: true,
            }
        }}
        {...props} />
))(() => ({
    '&:before': {
        display: 'none',
    },
    '&.Mui-expanded': {
        margin: 0,
    },

}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        {...props}
    />
))(() => ({
    borderRadius: '8px',
    background: 'var(--primary)',
    fontSize: 'medium',
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'inherit',
    padding: '0 1rem',
    gap: '7px',
    '& .MuiAccordionSummary-content': {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between'
    }

}))

const AccordionDetails = styled((props: AccordionDetailsProps) => (
    <MuiAccordionDetails {...props} />
))(() => ({
    padding: '0.5rem 0rem',
    overflow: 'hidden',
}))

interface Props {
    label: string;
    children: React.ReactNode;
    onDelete: () => void;
}

export default function AccordionSection({ label, children, onDelete }: Props) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return (
        <Accordion
            expanded={isExpanded}
            onChange={(_, expanded) => setIsExpanded(expanded)}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreOutlined sx={{ fontSize: '1.75rem' }} htmlColor={'white'} />}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    {label}

                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                    >
                        <Delete />
                    </IconButton>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}