import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const COLOR = {
  primary: "#BBDCE5",
  secondary: "#CFAB8D",
  background: "#ECEEDF",
  text: "#D9C4B0",
  accent: "#A67C52",
  white: "#FFF",
};

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${COLOR.background} 0%, ${COLOR.primary} 100%)`
      }}>
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 2,
          fontFamily: "'Baloo 2', cursive",
          fontSize: "4rem",
          color: COLOR.accent,
          textShadow: `2px 2px 0 ${COLOR.secondary}`
        }}>
        404
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          fontFamily: "'M PLUS Rounded 1c', sans-serif",
          color: COLOR.accent
        }}>
        ページが見つかりませんでした 🐾
      </Typography>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          gap: 1
        }}>
        <span
          className="zzz-bounce"
          style={{
            color: COLOR.secondary,
            fontSize: "2rem",
            animationDelay: "0s",
          }}
        >
          z
        </span>
        <span
          className="zzz-bounce"
          style={{
            color: COLOR.text,
            fontSize: "1.5rem",
            animationDelay: "0.2s",
          }}
        >
          z
        </span>
        <span
          className="zzz-bounce"
          style={{
            color: COLOR.accent,
            fontSize: "1.2rem",
            animationDelay: "0.4s",
          }}
        >
          z
        </span>
      </Box>
      <style>{`
        .zzz-bounce {
          display: inline-block;
          animation: zzzBounce 1s infinite;
        }
        @keyframes zzzBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          height: 200
        }}>
        <Image
          src="/sleepingCat.png"
          alt="sleeping cat"
          width={250}
          height={250}
          style={{
            position: "relative",
            top: "-40px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          mb: 2
        }}>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            fontFamily: "'Baloo 2', cursive",
            borderRadius: 10,
            background: COLOR.accent,
            color: COLOR.white,
            boxShadow: `0 4px 16px ${COLOR.secondary}`,
            transition: "transform 0.2s cubic-bezier(.4,2,.3,1)",
            "&:hover": {
              background: COLOR.secondary,
              color: COLOR.text,
              transform: "scale(1.07)",
            },
          }}
        >
          <Link
            href="https://shunniehub.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Portfolio
          </Link>
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            fontFamily: "'Baloo 2', cursive",
            borderRadius: 10,
            background: COLOR.accent,
            color: COLOR.white,
            boxShadow: `0 4px 16px ${COLOR.secondary}`,
            transition: "transform 0.2s cubic-bezier(.4,2,.3,1)",
            "&:hover": {
              background: COLOR.secondary,
              color: COLOR.text,
              transform: "scale(1.07)",
            },
          }}
        >
          <Link
            href="https://study-tracker.shunniehub.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Study Tracker
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
