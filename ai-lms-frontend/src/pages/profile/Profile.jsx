import {
  Avatar,
  Box,
  Typography,
  Stack,
} from "@mui/material";

import CustomCard from "../../components/common/CustomCard";

export default function Profile() {
  return (
    <Box p={4}>
      <CustomCard>
        <Stack
          spacing={3}
          alignItems="center"
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: "#0056D2",
              fontSize: 40,
            }}
          >
            S
          </Avatar>

          <Typography
            variant="h4"
            color="#F8FAFC"
          >
            Satya
          </Typography>

          <Typography color="#94A3B8">
            Student
          </Typography>
        </Stack>
      </CustomCard>
    </Box>
  );
}