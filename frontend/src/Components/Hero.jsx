import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { slides } from "../Utility/data";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Link } from "react-router-dom";

const AUTO_PLAY_INTERVAL = 3500;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, AUTO_PLAY_INTERVAL);

    return () => resetTimeout();
  }, [currentIndex]);

  return (
    <div className="pt-[100px] md:pt-1 bg-gray-100 mb-5 rounded-[1rem]">
      <Box
        sx={{
	
          backgroundColor: "#000",
          borderRadius: "1rem",
          overflow: "hidden",
          position: "relative",
          color: "#eee",
          width: "100%",
          height: { xs: "auto", md: "100vh" }, // auto height only for mobile
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "100%",
                height: "100%", // keep desktop height untouched
                position: "relative",
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src={slide.img}
                alt={`Slide ${index + 1}`}
                sx={{
                  width: "100%",
                  height: { xs: "auto", md: "100%" }, // auto height for mobile
                  objectFit: { xs: "contain", md: "cover" }, // contain on mobile
                  objectPosition: "center",
                  display: "block",
                  backgroundColor: "transparent",
                }}
              />

              {/* Text Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: "20%", md: "20%" }, // desktop top unchanged
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: "90%", md: "80%" }, // desktop width unchanged
                  color: "#fff",
                  textAlign: "center",
                  textShadow: "0 5px 10px rgba(0,0,0,0.25)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    lineHeight: 1,
                    letterSpacing: 1.8,
                    fontFamily: "Lora, serif",
                    fontSize: { xs: "24px", sm: "36px", md: "60px" },
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    lineHeight: 1.3,
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: { xs: "20px", sm: "36px", md: "70px" },
                  }}
                >
                  {slide.topic}
                </Typography>
                <Typography
                  sx={{
                    marginTop: "20px",
                    lineHeight: 1.5,
                    fontFamily: "Lora, serif",
                    fontSize: { xs: "12px", sm: "14px", md: "18px" },
                  }}
                >
                  {slide.des}
                </Typography>

                {/* See More Button */}
                {index !== 3 && (
  <Box
                       sx={{
      marginTop: "250px", // relative spacing to overlay text
      textAlign: { xs: "center", md: "left" }, // left on desktop, center on mobile if needed
      paddingRight: { md: "20px", xs: 0 }, // optional spacing from right
      width: "100%", // make Box full width so textAlign works
    }}
                      md={{ justtifyContent: ""
                        
                       }}
                    >
                  <Button
                    component={Link}
                    to={slide.path || "/products"}
                    variant="contained"
                    endIcon={<ArrowCircleRightIcon />}
                                           sx={{
                          marginTop: "40px",
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
</Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Floating Scroll Button */}
        <Box className="floatud-img absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center bg-[#f1cc94]  hover:bg-white bg-opacity-90 rounded-full px-4 py-2 shadow-md border-4 border-white hover:border-[#f1cc94]">
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
          <a href="#banner" className="ml-2 font-semibold text-sm text-black ">
            Scroll Down
          </a>
        </Box>
      </Box>
    </div>
  );
};

export default Carousel;
