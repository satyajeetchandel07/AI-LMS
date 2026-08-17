import { Typography } from "@mui/material";

export default function SectionTitle({ title }) {

    return (

        <Typography
            variant="h5"
            mb={2}
            fontWeight={600}
            
        >

            {title}

        </Typography>

    );

}