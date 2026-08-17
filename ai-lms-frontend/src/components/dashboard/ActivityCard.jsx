import {
    Card,
    CardContent,
    Typography,
    Stack
} from "@mui/material";

export default function ActivityCard() {

    const data = [

        "Assignment Uploaded",

        "Attendance Updated",

        "Quiz Tomorrow",

        "Certificate Generated",

        "new"

    ];

    return (

        <Card
            sx={{
                bgcolor:"#1E293B",
                
                border:"1px solid #334155",
                borderRadius:3
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    mb={2}
                    sx= {{
                      color: "#FFFF",
                      fontWeight: 700,
                      lineHeight:2,
                    }}
                >

                    Recent Activity

                </Typography>

                <Stack spacing={2}>

                    {data.map((item,index)=>(

                        <Typography
                            key={index}
                            sx= {{
                                color: "#94A3B8"
                            }}
                        >

                            • {item}

                        </Typography>

                    ))}

                </Stack>

            </CardContent>

        </Card>

    );

}