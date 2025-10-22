import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Grid from "@mui/material/Grid";


// Navigation links for quick access
const navLinks = [
  { title: "Home", path: "/" },
  { title: "Products", path: "/" },
  { title: "Contact Us", path: "/" },
];

// Useful external links
const UsefulLinks = [
  { title: "Privacy Policy", href: "https://src.sastra.edu/" },
  { title: "Return & Refund Policy", path: "https://src.sastra.edu/" },
];

// Social media links
const socialLinks = [
  {
    Icon: InstagramIcon,
    url: "https://www.instagram.com/theta_src",
  },
  { Icon: YouTubeIcon, url: "https://www.youtube.com/@thetasrc" },
];

// Function to scroll to top when links are clicked
const ScrollToTop = () => {
  window.scrollTo(0, 0);
};

const Footer = () => {
  // State for responsive handling
  const [, setIsMobile] = useState(window.innerWidth < 600);
  const [, setIsTablet] = useState(
    window.innerWidth >= 600 && window.innerWidth < 960,
  );

  // Function to handle window resizing
  const handleResize = () => {
    setIsMobile(window.innerWidth < 600);
    setIsTablet(window.innerWidth >= 600 && window.innerWidth < 960);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section>
    <div className="py-2  ">
    <Box  sx={{
    background: "linear-gradient(to bottom left, #ffba52 0%, #ffffff 50%, #ffba52 100%)",
    border: '2px solid',
    borderColor: "#ffffff",
    borderRadius: '20px',
    color: "#4E3D28",
    px: { xs: 2 }
  }}>
      <Box sx={{ py: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          {/* Contact Information Section */}
          <Grid size={{ xs:12 ,sm:6, md:4}}>
            <Typography variant="h6"   gutterBottom sx={{ fontWeight: 'bold' }}>
              CRAFTED CALM IN EVERY FLAME
            </Typography>
            <Box display="flex" alignItems="center" mt={2}>
              <HomeIcon />
              <Typography sx={{ ml: 2, fontWeight: 600}}>
                12, Mela Veethi, Near Mahamaham Tank, Kumbakonam – 612001
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <PhoneIcon />
              <Typography sx={{ ml: 2 ,fontWeight: 600}}>0435-2426823</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <EmailIcon />
              <Typography sx={{ ml: 2,fontWeight: 600 }}>support@candleglow.in</Typography>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid size={{ xs:12 ,sm:6 ,md:2}}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            {navLinks.map((item, index) => (
              <Typography key={index} sx={{ mb: 1 ,}}>
                <a
                  href={item.path}
                  onClick={ScrollToTop}
                  style={{ color:"#4E3D28", textDecoration: "none" }}
                >
                  {item.title}
                </a>
              </Typography>
            ))}
          </Grid>

          {/* Useful Links Section */}
          <Grid size={{ xs:12 ,sm:6 ,md:2}}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Useful links
            </Typography>
            {UsefulLinks.map((item, index) => (
              <Typography key={index} sx={{ mb: 1 }}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color:"#4E3D28", textDecoration: "none" }}
                  >
                    {item.title}
                  </a>
                ) : (
                  <a
                    href={item.path}
                    onClick={ScrollToTop}
                    style={{ color:"#4E3D28", textDecoration: "none" }}
                  >
                    {item.title}
                  </a>
                )}
              </Typography>
            ))}
          </Grid>

          {/* Social Media Section */}
          <Grid size={{ xs:12 ,sm:6 ,md:3}}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Subscribe for latest updates
            </Typography>
            <Box mt={2} display="flex" justifyContent="flex-start">
              {socialLinks.map(({ Icon, url }, index) => (
                <IconButton
                  key={index}
                  color="inherit"
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    mr: 1,
                    "&:hover": {
                      color: "#FFB700",
                      transition: "color 0.3s ease",
                    },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Footer Copyright Section */}
        <Box textAlign="center" mt={5}>
          <Typography variant="body2">
            Copyright &copy; 2025 Candlex | Designed and Developed by{" "}
            <a
             
              onClick={ScrollToTop}
              style={{
                color: "#FFB700",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Dream in Divs
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>
    </div>
    </section>
  );
};

export default Footer; // Footer component for the website