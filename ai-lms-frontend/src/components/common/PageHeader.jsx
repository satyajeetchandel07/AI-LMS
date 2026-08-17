import { Typography } from "@mui/material";

export default function PageHeader({

    title,

    subtitle

}){

    return(

        <>

            <Typography

                variant="h4"

                fontWeight={700}

                color="#F8FAFC"

            >

                {title}

            </Typography>

            <Typography

                color="#94A3B8"

                mt={1}

            >

                {subtitle}

            </Typography>

        </>

    );

}