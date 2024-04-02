import React from "react";

import Navbar from '../components/Navbar.jsx'

import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

export default function ContactUs() {
    const [name, setName] = useState(""); const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <Navbar />
            <h2>Contact Us</h2>
            <p>If you have any questions or need assistance, please feel free to contact us at any time. We are available 24/7 to assist you.</p>
            <Box
                sx={{

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}>
                <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
                    <Typography variant="h4" align="center" mb={2}>
                        Contact Us
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullwidth
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullwidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            type="email"
                        />
                        <TextField
                            fullwidth
                            label="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            margin="normal"
                            required
                            multiline
                            rows={4} />
                        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Box>
        </div>
    )
}







