import { TextField } from "@mui/material";

export default function CustomInput(props){

    return(

        <TextField

            fullWidth

            variant="outlined"

            sx={{

                "& .MuiOutlinedInput-root":{

                    bgcolor:"#0F172A",

                    color:"#F8FAFC",

                    borderRadius:3

                }

            }}

            {...props}

        />

    );

}