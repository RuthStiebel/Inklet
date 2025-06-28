import React, { type ReactNode } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
  currentPageName: string;
}

export default function Layout({ children, currentPageName }: LayoutProps) {
  return (
    <Box minHeight="100vh" bgcolor="background.default">
      {/* Header */}
      <Paper
        elevation={1}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          backdropFilter: "blur(8px)",
          background: "rgba(255,255,255,0.8)",
          borderBottom: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={64}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                width={40}
                height={40}
                bgcolor="primary.main"
                borderRadius={12}
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow={3}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ color: "white" }}
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    background: "linear-gradient(to right, #424242, #212121)",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  DrawCanvas
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Digital Drawing
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Main Content */}
      <Box component="main" flex={1} py={2}>
        {children}
      </Box>
    </Box>
  );
}
