import { Card, CardContent, Typography, Box } from "@mui/material";

export default function ChartCard({ title }) {

    return (

        <Card
            sx={{
                bgcolor: "#1E293B",
                
                border: "1px solid #334155",
                borderRadius: 3,
                height: 320
            }}
        >

            <CardContent>

                <Typography variant="h6">

                    {title}

                </Typography>

                <Box
                    height={240}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="#64748B"
                    
                >

                    Chart Placeholder

                </Box>

            </CardContent>

        </Card>

    );

}