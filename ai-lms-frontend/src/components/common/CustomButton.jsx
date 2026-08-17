import { Button } from "@mui/material";

export default function CustomButton({
    children,
    ...props
}) {

    return (

        <Button

            variant="contained"

            sx={{
                bgcolor:"#0056D2",

                borderRadius:3,

                textTransform:"none",

                fontWeight:600,

                height:48,

                "&:hover":{

                    bgcolor:"#0047B0"

                }

            }}

            {...props}

        >

            {children}

        </Button>

    );

}