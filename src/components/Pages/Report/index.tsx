"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import React from "react";
import { StreakBadge } from "@/components/Atoms/StreakBadge";
import { ReportForm } from "@/components/Organisms/ReportForm";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { useReport } from "./useReport";

export function Report() {
  const {
    methods,
    control,
    errors,
    textbooks,
    hourOptions,
    minuteOptions,
    onSubmit,
    showAlert,
    setShowAlert,
    isDisabled,
    todayLabel,
    streak,
    recentPosts,
  } = useReport();

  return (
    <SingleColumn title="学習記録">
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {todayLabel}
        </Typography>
        <Typography
          component="h1"
          sx={{ fontSize: "20px", fontWeight: 700, color: "text.primary", mb: 1.25 }}
        >
          今日も学習しよう！
        </Typography>
        {streak > 0 && <StreakBadge streak={streak} />}
      </Box>
      <ReportForm
        methods={methods}
        control={control}
        errors={errors}
        textbooks={textbooks}
        hourOptions={hourOptions}
        minuteOptions={minuteOptions}
        onSubmit={onSubmit}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        isDisabled={isDisabled}
      />
      {recentPosts.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: 700,
              color: "text.secondary",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              mb: 1.25,
            }}
          >
            最近の記録
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {recentPosts.map((post, index) => (
              <React.Fragment key={post.id}>
                {index > 0 && <Divider />}
                <Box
                  sx={{
                    backgroundColor: "#F0F1F8",
                    borderRadius: "10px",
                    p: "12px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "text.primary" }}>
                      {post.textbook.name}
                    </Typography>
                    <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#4361EE" }}>
                      {post.time}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
                    {post.content}
                  </Typography>
                </Box>
              </React.Fragment>
            ))}
          </Box>
          <Button
            component={NextLink}
            href="/posts"
            variant="outlined"
            fullWidth
            sx={{
              mt: 1.5,
              borderColor: "#C5CEFF",
              color: "#4361EE",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 600,
              py: "9px",
              "&:hover": { borderColor: "#4361EE", backgroundColor: "#EEF1FF" },
            }}
          >
            記録をすべて見る →
          </Button>
        </Box>
      )}
    </SingleColumn>
  );
}
