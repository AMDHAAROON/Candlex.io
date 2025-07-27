import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { keyframes } from "@emotion/react";
import { slides } from "../Utility/data";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const AUTO_PLAY_INTERVAL = 3500;
const TRANSITION_DURATION = 3000;

const progressAnimation = keyframes`
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  `;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const theme = useTheme(); // Accessing MUI theme for breakpoints

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
      );
    }, AUTO_PLAY_INTERVAL);

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  return (
    <div className="py-1 bg-gray-300 pb-5">
    <Box
       
      sx={{
        backgroundColor: "#000",
        borderTopRightRadius: "1rem",
        borderTopLeftRadius: "1rem",
         borderBottomLeftRadius: "3rem",  // 2xl = 1rem = 16px
    borderBottomRightRadius: "3rem",
     overflow: "hidden",
        color: "#eee",
        fontFamily: "Poppins, sans-serif",
        fontSize: "12px",
        margin: 0,
        position: "relative",
        height: "100vh", // Default height for larger screens
        [theme.breakpoints.down("sm")]: {
          height: "90vh", // Adjust height for small screens
        },
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            height: "100%", // Ensure full height is utilized
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "100%",
                height: "100%", // Ensure each slide takes up full height
                position: "relative",
              }}
            >
              <div className="w-full h-[100vh] sm:h-screen overflow-hidden">
            <Box
  component="img"
  src={slide.img}
  alt={`Slide ${index + 1}`}
  sx={{
    width: "100%",
    height: "100%", // Force the image to take up full height
    objectFit: "cover",
     objectPosition: "center top", // better fallback, works across breakpoints
    display: "block",
    // height: { xs: "calc(150dvh - 200px)", sm: "100vh" }

  }}
/>
</div>
              <Box
                sx={{
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: "90%", md: "80%" },
                  paddingRight: { xs: 0, md: "30%" },
                  boxSizing: "border-box",
                  color: "#fff",
                  textShadow: "0 5px 10px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                    lineHeight: "1.0em",
                    letterSpacing: 1.8,
                    fontFamily: "Lora, serif", // Custom font for titles
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  // variant="h2"
                  sx={{
                    fontWeight: "bold",
                    lineHeight: "1.3em",
                    color: "#FFFFFF",
                    fontSize: {xs:"55px",md:"70px"},
                    fontFamily: "'Dancing Script', cursive",
                  }}
                >
                  {slide.topic}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ marginTop: "20px", lineHeight: "1.5em",  fontFamily: "Lora, serif", }}
                >
                  {slide.des}
                </Typography>

                {/* See More Button */}
                {index !== 3 && (
                <Box sx={{ marginTop: "270px" }} md={{justtifyContent: "center"}}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowCircleRightIcon />}
                    href={slide.path}
                    sx={{
                      background: `linear-gradient(91.83deg, rgb(255, 81, 47) 0%, rgb(221, 36, 118) 100%)`,
                      textTransform: "none",
                      borderRadius: "50px",
                      fontSize: "1rem",
                      px: [4],
                      color: "#fff",
                      zIndex: 1,
                      border: "2px solid transparent",
                      "&:hover": {
                        background: "transparent",
                        border: "2px solid #EF3D4E",
                      },
                    }}
                  >
                    See More
                  </Button>
                </Box>)}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Thumbnails with Titles & Descriptions */}
        {/* <Box
          sx={{
            position: "absolute",
            bottom: ["10px", "10px"],
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            zIndex: 30,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: { xs: "70px", sm: "80px" },
                height: { xs: "100px", sm: "120px" },
                flexShrink: 0,
                position: "relative",
                cursor: "pointer",
                borderRadius: "20px",
                overflow: "hidden",
                border:
                  index === currentIndex
                    ? "5px solid #FFAE35"
                    : "5px solid transparent",
                transition: "transform 0.3s",
                scrollSnapAlign: "start",
                "&:hover img": {
                  transform: "scale(1.05)",
                  maxWidth: "100%",      // Ensures it doesn’t overflow container
    scrollSnapType: "x mandatory", 
    zIndex: 1, // ✅ lower zIndex
    marginTop: 0,
    
                },
              }}
            >
              <Box
                component="img"
                src={slide.img}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s",
                  position:"relative",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  right: "10px",
                  color: "#fff",
                }}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                  {slide.thumbnailtitle}
                </Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: 300 }}>
                  {slide.thumbnaildesc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* Progress Bar */}
        <Box
          sx={{
            position: "absolute",
            zIndex: 1000,
            width: "100%",
            height: "3px",
            backgroundColor: "#333",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#f1683a",
              animation: `${progressAnimation} ${AUTO_PLAY_INTERVAL}ms linear infinite`,
            }}
          />
        </Box>
        

      </Box>
    
  <Box
    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#f1cc94] bg-opacity-90 rounded-full px-4 py-2 shadow-md border border-white"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5 text-black"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
      />
    </svg>
    <a href="#about" className="ml-2 font-semibold text-sm text-black">
      Scroll Down
    </a>
  </Box>
    </Box>
   
    </div>
  );
};

export default Carousel;