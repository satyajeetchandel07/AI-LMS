import {
    Card,
    CardContent,
    Typography,
    Button
} from "@mui/material";

export default function AIWidget() {

    return (

        <Card
            sx={{
                bgcolor:"#1E293B",
                border:"1px solid #334155",
                borderRadius:3,
                display: "grid",
                mb: 2,
                 lineHeight: 1.5,
                gridTemplateColumns: {
        xs: "1fr",
        sm: ".8fr ",

      },
      gap: 1.5,
      height: "100%",
      width: 520,
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    sx={{
                        color: "#94A3B8",
                        fontSize: 18,
                        mb: 2,
                        lineHeight: 3,
                        textAlign: "center",
                    }}
                >

                    🤖 Smart Study Planner

                </Typography>

                <Typography
                    color="#94A3B8"
                    textAlign="center"
                    mt={2}
                    mb={3}
                    sx={{mb: 2,
                        lineHeight: 1.5,
                    }}
                >

                    Our AI analyzes your deadlines to create a personalized study plan.
      Optimize your learning schedule.

                </Typography>

                <Button
                sx={{
                    mb: 1,
                    lineHeight: 2,
                    backgroundColor: "#334155",
                    "&:hover": {
                        backgroundColor: "#0056D2",
                    },
                }}
                   variant="contained"
                    fullWidth
                  onClick={() => {
                  window.location.href =
                 "/student/study-planner";
                   }}
                >

                    View Planner

                </Button>

            </CardContent>

        </Card>

    );

}