import { Card } from "@mui/material";

export default function CustomCard({

    children

}){

    return(

        <Card

            sx={{

                bgcolor:"#1E293B",

                border:"1px solid #334155",

                borderRadius:4,

                p:3

            }}

        >

            {children}

        </Card>

    );

}