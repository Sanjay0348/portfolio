import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  TextField, 
  Button, 
  Snackbar, 
  Alert, 
  CircularProgress 
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import "../assets/styles/Contact.scss"

const Contact = ({ mode }: { mode: string }) => {
  type ErrorFields = {
    name: boolean;
    email: boolean;
    message: boolean;
  };
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Form handling state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [fieldFocus, setFieldFocus] = useState({
    name: false,
    email: false,
    message: false
  });

  const [errors, setErrors] = useState<ErrorFields>({
    name: false,
    email: false,
    message: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitAnimation, setSubmitAnimation] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const form = useRef();

  // Handlers
  const handleChange = (e:any) => {
    const { id, value } = e.target;
    const field = id.split('-').pop();
    
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error when typing
    if (errors[field as keyof ErrorFields]) {
      setErrors({
        ...errors,
        [field]: false
      });
    }
  };

  const handleFocus = (field:any) => {
    setFieldFocus({
      ...fieldFocus,
      [field]: true
    });
  };

  const handleBlur = (field:any) => {
    setFieldFocus({
      ...fieldFocus,
      [field]: false
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      message: !formData.message.trim()
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const sendEmail = (e:any) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setSubmitAnimation(true);
    
    // Simulate email sending (replace with actual email service)
    setTimeout(() => {
      setLoading(false);
      setNotification({
        open: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitAnimation(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div id="contact" className={`contact-section ${mode}-mode`}>
      <div className="contact-container">
        <motion.div 
          className="contact-info"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants}>Let's Connect</motion.h2>
          <motion.p variants={itemVariants} className="contact-subtitle">
            Have a project in mind or want to discuss a collaboration opportunity? 
            I'm always open to new ideas and challenges.
          </motion.p>
          
          <motion.div variants={itemVariants} className="contact-detail">
            <div className="icon-wrapper">
              <LocationOnIcon />
            </div>
            <div>
              <h4>Location</h4>
              <p>Chennai, India</p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="contact-detail">
            <div className="icon-wrapper">
              <EmailIcon />
            </div>
            <div>
              <h4>Email</h4>
              <p><a href="mailto:sanjayvenkat0348@gmail.com">sanjayvenkat0348@gmail.com</a></p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="contact-detail">
            <div className="icon-wrapper">
              <PhoneIcon />
            </div>
            <div>
              <h4>Phone</h4>
              <p><a href="tel:+918838487815">+91 8838487815</a></p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="social-links">
            <a href="https://linkedin.com/in/sanjayvenkat0348" target="_blank" rel="noreferrer" className="social-link">
              <LinkedInIcon />
            </a>
            <a href="https://github.com/sanjay0348" target="_blank" rel="noreferrer" className="social-link">
              <GitHubIcon />
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="contact-form-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants}>Send Me a Message</motion.h2>
          
          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className='contact-form'
          >
            <motion.div variants={itemVariants} className="form-field">
              <TextField
                required
                id="outlined-required-name"
                label="Your Name"
                placeholder="What's your name?"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                error={errors.name}
                helperText={errors.name ? "Please enter your name" : ""}
                fullWidth
                variant="outlined"
                className={`input-field ${fieldFocus.name ? 'focused' : ''}`}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-field">
              <TextField
                required
                id="outlined-required-email"
                label="Email / Phone"
                placeholder="How can I reach you?"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                error={errors.email}
                helperText={errors.email ? "Please enter a valid email or phone number" : ""}
                fullWidth
                variant="outlined"
                className={`input-field ${fieldFocus.email ? 'focused' : ''}`}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-field">
              <TextField
                required
                id="outlined-multiline-static-message"
                label="Message"
                placeholder="Share your project ideas or questions..."
                multiline
                rows={6}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={() => handleBlur('message')}
                error={errors.message}
                helperText={errors.message ? "Please enter your message" : ""}
                fullWidth
                variant="outlined"
                className={`input-field ${fieldFocus.message ? 'focused' : ''}`}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-action">
              <Button 
                variant="contained" 
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />} 
                onClick={sendEmail}
                disabled={loading}
                className={`submit-button ${submitAnimation ? 'animate-submit' : ''}`}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </div>
      
      {/* Success/Error notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity === 'success' ? 'success' : 'error'} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      
      {/* Decorative elements */}
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
    </div>
  );
};

export default Contact;