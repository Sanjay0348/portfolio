// import React, { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import {
//   Box,
//   TextField,
//   Button,
//   Snackbar,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import emailjs from "@emailjs/browser";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import SendIcon from "@mui/icons-material/Send";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import "../assets/styles/Contact.scss";

// const Contact = ({ mode }: { mode: string }) => {
//   type ErrorFields = {
//     name: boolean;
//     email: boolean;
//     message: boolean;
//   };
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.5 },
//     },
//   };

//   // Form handling state
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [fieldFocus, setFieldFocus] = useState({
//     name: false,
//     email: false,
//     message: false,
//   });

//   const [errors, setErrors] = useState<ErrorFields>({
//     name: false,
//     email: false,
//     message: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [submitAnimation, setSubmitAnimation] = useState(false);
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const form = useRef();

//   // Handlers
//   const handleChange = (e: any) => {
//     const { id, value } = e.target;
//     const field = id.split("-").pop();

//     setFormData({
//       ...formData,
//       [field]: value,
//     });

//     // Clear error when typing
//     if (errors[field as keyof ErrorFields]) {
//       setErrors({
//         ...errors,
//         [field]: false,
//       });
//     }
//   };

//   const handleFocus = (field: any) => {
//     setFieldFocus({
//       ...fieldFocus,
//       [field]: true,
//     });
//   };

//   const handleBlur = (field: any) => {
//     setFieldFocus({
//       ...fieldFocus,
//       [field]: false,
//     });
//   };

//   const handleCloseNotification = () => {
//     setNotification({
//       ...notification,
//       open: false,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {
//       name: !formData.name.trim(),
//       email: !formData.email.trim(),
//       message: !formData.message.trim(),
//     };

//     setErrors(newErrors);
//     return !Object.values(newErrors).some((error) => error);
//   };

//   const sendEmail = (e: any) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     setSubmitAnimation(true);
//     if (
//       formData.name !== "" &&
//       formData.email !== "" &&
//       formData.message !== ""
//     ) {
//       var templateParams = {
//         name: formData.name,
//         email: formData.email,
//         message: formData.message,
//       };

//       console.log(templateParams);
//       emailjs.send("service_3345k7e", "template_um", templateParams, "api_key").then(
//         (response) => {
//           console.log("SUCCESS!", response.status, response.text);
//         },
//         (error) => {
//           console.log("FAILED...", error);
//         }
//       );
//     }
//     setTimeout(() => {
//       setLoading(false);
//       setNotification({
//         open: true,
//         message: "Message sent successfully! I'll get back to you soon.",
//         severity: "success",
//       });

//       setFormData({
//         name: "",
//         email: "",
//         message: "",
//       });

//       setTimeout(() => {
//         setSubmitAnimation(false);
//       }, 2000);
//     }, 1500);
//   };

//   return (
//     <div id="contact" className={`contact-section ${mode}-mode`}>
//       <div className="contact-container">
//         <motion.div
//           className="contact-info"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           variants={containerVariants}
//         >
//           <motion.h2 variants={itemVariants}>Let's Connect</motion.h2>
//           <motion.p variants={itemVariants} className="contact-subtitle">
//             Have a project in mind or want to discuss a collaboration
//             opportunity? I'm always open to new ideas and challenges.
//           </motion.p>

//           <motion.div variants={itemVariants} className="contact-detail">
//             <div className="icon-wrapper">
//               <LocationOnIcon />
//             </div>
//             <div>
//               <h4>Location</h4>
//               <p>Chennai, India</p>
//             </div>
//           </motion.div>

//           <motion.div variants={itemVariants} className="contact-detail">
//             <div className="icon-wrapper">
//               <EmailIcon />
//             </div>
//             <div>
//               <h4>Email</h4>
//               <p>
//                 <a href="mailto:sanjayvenkat0348@gmail.com">
//                   sanjayvenkat0348@gmail.com
//                 </a>
//               </p>
//             </div>
//           </motion.div>

//           <motion.div variants={itemVariants} className="contact-detail">
//             <div className="icon-wrapper">
//               <PhoneIcon />
//             </div>
//             <div>
//               <h4>Phone</h4>
//               <p>
//                 <a href="tel:+918838487815">+91 8838487815</a>
//               </p>
//             </div>
//           </motion.div>

//           <motion.div variants={itemVariants} className="social-links">
//             <a
//               href="https://linkedin.com/in/sanjayvenkat0348"
//               target="_blank"
//               rel="noreferrer"
//               className="social-link"
//             >
//               <LinkedInIcon />
//             </a>
//             <a
//               href="https://github.com/sanjay0348"
//               target="_blank"
//               rel="noreferrer"
//               className="social-link"
//             >
//               <GitHubIcon />
//             </a>
//           </motion.div>
//         </motion.div>

//         <motion.div
//           className="contact-form-container"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           variants={containerVariants}
//         >
//           <motion.h2 variants={itemVariants}>Send Me a Message</motion.h2>

//           <Box
//             ref={form}
//             component="form"
//             noValidate
//             autoComplete="off"
//             className="contact-form"
//           >
//             <motion.div variants={itemVariants} className="form-field">
//               <TextField
//                 required
//                 id="outlined-required-name"
//                 label="Your Name"
//                 placeholder="What's your name?"
//                 value={formData.name}
//                 onChange={handleChange}
//                 onFocus={() => handleFocus("name")}
//                 onBlur={() => handleBlur("name")}
//                 error={errors.name}
//                 helperText={errors.name ? "Please enter your name" : ""}
//                 fullWidth
//                 variant="outlined"
//                 className={`input-field ${fieldFocus.name ? "focused" : ""}`}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants} className="form-field">
//               <TextField
//                 required
//                 id="outlined-required-email"
//                 label="Email / Phone"
//                 placeholder="How can I reach you?"
//                 value={formData.email}
//                 onChange={handleChange}
//                 onFocus={() => handleFocus("email")}
//                 onBlur={() => handleBlur("email")}
//                 error={errors.email}
//                 helperText={
//                   errors.email
//                     ? "Please enter a valid email or phone number"
//                     : ""
//                 }
//                 fullWidth
//                 variant="outlined"
//                 className={`input-field ${fieldFocus.email ? "focused" : ""}`}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants} className="form-field">
//               <TextField
//                 required
//                 id="outlined-multiline-static-message"
//                 label="Message"
//                 placeholder="Share your project ideas or questions..."
//                 multiline
//                 rows={6}
//                 value={formData.message}
//                 onChange={handleChange}
//                 onFocus={() => handleFocus("message")}
//                 onBlur={() => handleBlur("message")}
//                 error={errors.message}
//                 helperText={errors.message ? "Please enter your message" : ""}
//                 fullWidth
//                 variant="outlined"
//                 className={`input-field ${fieldFocus.message ? "focused" : ""}`}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants} className="form-action">
//               <Button
//                 variant="contained"
//                 endIcon={
//                   loading ? (
//                     <CircularProgress size={20} color="inherit" />
//                   ) : (
//                     <SendIcon />
//                   )
//                 }
//                 onClick={sendEmail}
//                 disabled={loading}
//                 className={`submit-button ${
//                   submitAnimation ? "animate-submit" : ""
//                 }`}
//               >
//                 {loading ? "Sending..." : "Send Message"}
//               </Button>
//             </motion.div>
//           </Box>
//         </motion.div>
//       </div>

//       {/* Success/Error notification */}
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseNotification}
//           severity={notification.severity === "success" ? "success" : "error"}
//           sx={{ width: "100%" }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>

//       {/* Decorative elements */}
//       <div className="shape shape-1"></div>
//       <div className="shape shape-2"></div>
//       <div className="shape shape-3"></div>
//     </div>
//   );
// };

// export default Contact;

import React, { useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { Box, Button, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../assets/styles/Contact.scss";

interface ContactProps {
  mode: string;
}

const Contact: React.FC<ContactProps> = ({ mode }) => {
  const controls = useAnimation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  // Animation variants with more advanced effects
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
        when: "beforeChildren"
      },
    },
  };

  const sectionVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.7
      }
    }
  };

  const socialButtonVariants: Variants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.08,
      y: -8,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      },
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
  };

  const shapesVariants = {
    hidden: (custom: number) => ({
      opacity: 0,
      scale: 0.5,
      x: custom % 2 === 0 ? -100 : 100,
      y: custom > 2 ? 100 : -100,
    }),
    visible: {
      opacity: 0.8,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 1.5
      }
    },
    floating: (custom: number) => ({
      y: [0, custom % 2 === 0 ? -15 : -10, 0],
      x: [0, custom > 2 ? 10 : -10, 0],
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 5 + custom,
        ease: "easeInOut"
      }
    })
  };

  // Trigger animations when component is in view
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Contact info data for cleaner code
  const contactDetails = [
    {
      icon: <LocationOnIcon />,
      title: "Location",
      content: "Chennai, India",
      link: null
    },
    {
      icon: <EmailIcon />,
      title: "Email",
      content: "sanjayvenkat0348@gmail.com",
      link: "mailto:sanjayvenkat0348@gmail.com"
    },
    {
      icon: <PhoneIcon />,
      title: "Phone",
      content: "+91 8838487815",
      link: "tel:+918838487815"
    }
  ];

  // Social media data for cleaner code
  const socialLinks = [
    {
      platform: "LinkedIn",
      icon: <LinkedInIcon />,
      description: "Professional Updates",
      link: "https://linkedin.com/in/sanjay-venkat0348",
      className: "linkedin"
    },
    {
      platform: "GitHub",
      icon: <GitHubIcon />,
      description: "Code Projects",
      link: "https://github.com/sanjay0348",
      className: "github"
    },
    {
      platform: "Email",
      icon: <EmailIcon />,
      description: "Direct Message",
      link: "mailto:sanjayvenkat0348@gmail.com",
      className: "email"
    }
  ];

  return (
    <motion.div 
      id="contact" 
      className={`contact-section ${mode}-mode`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="contact-container"
        variants={sectionVariants}
      >
        <motion.div
          className="contact-info"
          variants={sectionVariants}
        >
          <motion.h2 variants={titleVariants}>Let's Connect</motion.h2>
          <motion.p variants={itemVariants} className="contact-subtitle">
            Have a project in mind or want to discuss a collaboration
            opportunity? I'm always open to new ideas and challenges.
          </motion.p>

          {contactDetails.map((detail, index) => (
            <motion.div 
              key={`contact-detail-${index}`}
              variants={itemVariants}
              custom={index} 
              className="contact-detail"
              whileHover={{ 
                x: 5, 
                transition: { type: "spring", stiffness: 300, damping: 10 } 
              }}
            >
              <motion.div 
                className="icon-wrapper"
                whileHover={{ 
                  rotate: [0, -10, 10, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {detail.icon}
              </motion.div>
              <div>
                <h4>{detail.title}</h4>
                <p>
                  {detail.link ? (
                    <a href={detail.link}>{detail.content}</a>
                  ) : (
                    detail.content
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="connect-social-container"
          variants={sectionVariants}
        >
          <motion.h2 variants={titleVariants}>Connect With Me</motion.h2>
          <motion.p variants={itemVariants} className="connect-subtitle">
            Let's stay in touch! Connect with me on these platforms for updates,
            discussions, or just to say hello.
          </motion.p>

          <motion.div variants={itemVariants} className="social-grid">
            {socialLinks.map((social, index) => (
              <Tooltip key={`social-${index}`} title={social.platform} arrow placement="top">
                <motion.a
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`social-card ${social.className}`}
                  variants={socialButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                >
                  <motion.div 
                    className="social-icon"
                    whileHover={{
                      rotate: 360,
                      transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                  >
                    {social.icon}
                  </motion.div>
                  <span>{social.description}</span>
                </motion.a>
              </Tooltip>
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="collaboration-cta"
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 200, damping: 10 }
            }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Looking for Collaboration?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              I'm always excited to work on innovative projects and new
              challenges.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 1.2, 
                duration: 0.6,
                type: "spring",
                stiffness: 200
              }}
            >
              <Button
                variant="contained"
                color="primary"
                className="cta-button"
                href="mailto:sanjayvenkat0348@gmail.com?subject=Collaboration Opportunity"
              >
                Let's Talk
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative elements with advanced animations */}
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={`shape-${i}`}
          className={`shape shape-${i}`}
          custom={i}
          variants={shapesVariants}
          initial="hidden"
          animate={["visible", "floating"]}
        />
      ))}
    </motion.div>
  );
};

export default Contact;
