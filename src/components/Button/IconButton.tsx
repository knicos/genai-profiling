import Delete from "@mui/icons-material/Delete"
import { IconButton as IconBButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material";

export const IconButton = styled(IconBButton)({
    borderRadius: '8px',
})

export const DeleteButton = ({ onClick, ...props }: IconButtonProps) => (
    <IconButton onClick={onClick} {...props}>
        <Delete />
    </IconButton>
)