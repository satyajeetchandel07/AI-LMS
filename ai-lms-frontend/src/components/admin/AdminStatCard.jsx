import { Box, Typography } from "@mui/material";

export default function AdminStatCard({
  title,
  value,
  subtitle,
  icon,
  color = "#0056D2",
}) {
  return (
    <Box
      sx={{
        backgroundColor: "#1E293B",
        border: "1px solid #334155",
        borderRadius: 3,
        p: 3,
        minHeight: 150,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#94A3B8",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: "#F8FAFC",
              fontSize: 32,
              fontWeight: 700,
              mt: 1,
            }}
          >
            {value}
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
              fontSize: 13,
              mt: 1,
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 2,
            backgroundColor: `${color}20`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
      </Box>
    </Box>
  );
}