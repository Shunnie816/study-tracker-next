"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import React from "react";
import { Icon } from "@/components/Atoms/Icon";
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
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            color: "text.primary",
            mb: 1.25,
          }}
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
              fontSize: "10px",
              fontWeight: 700,
              color: "text.disabled",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            最近の記録
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {recentPosts.map((post) => (
              <Box
                key={post.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  p: "8px 10px",
                  backgroundColor: "background.paper",
                  border: "1px solid #E2E4F0",
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    backgroundColor: "#EEF1FF",
                    borderRadius: "6px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon icon="book" fontSize="small" color="primary" />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "text.primary",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {post.textbook.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "10px", color: "text.disabled", mt: "1px" }}
                  >
                    {String(post.time)}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "text.disabled",
                    flexShrink: 0,
                  }}
                >
                  {post.relativeDateLabel}
                </Typography>
              </Box>
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
