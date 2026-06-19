"use client";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import React from "react";
import { Card } from "@/components/Atoms/Card";
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {todayLabel}
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
          <Card title="直近の記録" variant="soft-shadow">
            <List dense disablePadding>
              {recentPosts.map((post, index) => (
                <React.Fragment key={post.id}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem disablePadding sx={{ py: 0.5 }}>
                    <Box>
                      <Typography variant="body2">
                        {post.textbook.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {post.date.slice(0, 10)} · {post.time}
                      </Typography>
                    </Box>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ textAlign: "right", mt: 1 }}>
              <MuiLink
                component={NextLink}
                href="/posts"
                underline="hover"
                variant="caption"
              >
                すべて見る →
              </MuiLink>
            </Box>
          </Card>
        </Box>
      )}
    </SingleColumn>
  );
}
