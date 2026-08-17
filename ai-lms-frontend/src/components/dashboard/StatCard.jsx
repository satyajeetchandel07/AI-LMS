import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";


export default function StatCard({
    title,
    value,
    subtitle,
    icon,
    color
}) {

    return (

        <motion.div
            whileHover={{
                y: -6,
                transition: { duration: 0.25 }
            }}
            style={{
                width: "100%",
                height: "100%",
            }}
        >

            <Card
  sx={{
    bgcolor: "#1E293B",
    border: "1px solid #334155",
    borderRadius: 3,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  }}
>

                <CardContent
                    sx={{
                        flex: 1,
                        display: "flex",
                    }}
                >

                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >

                        {/* TEXT */}
                        <Box>

                            <Typography
                                sx={{
                                    color: "#94A3B8",
                                    fontSize: 18,
                                }}
                            >
                                {title}
                            </Typography>


                            <Typography
                                variant="h4"
                                mt={1}
                                sx={{
                                    color: "#FFFFFF",
                                    fontWeight: 500,
                                }}
                            >
                                {value}
                            </Typography>


                            <Typography
                                mt={1}
                                sx={{
                                    color: color || "#94A3B8",
                                }}
                            >
                                {subtitle}
                            </Typography>

                        </Box>


                        {/* ICON */}
                        <Box>
                            {icon}
                        </Box>

                    </Box>

                </CardContent>

            </Card>

        </motion.div>

    );
}