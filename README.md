# Tribal Tunes

## Website Link: https://tribal-tunes.vercel.app/

## Introduction:
This project aims to enhance visitor engagement at the Indira Gandhi Rashtriya Manav Sangrahalaya in Bhopal, Madhya Pradesh, by enabling them to experience the unique sounds of traditional tribal musical instruments. By integrating auditory elements into the exhibits, the project creates a more immersive and inclusive experience, particularly benefiting visually challenged individuals.

## Usage
- Visit the museum and locate the tribal musical instrument exhibits.
- Scan the QR codes placed next to each instrument to access their respective web pages.
- Listen to the recorded sounds and read about the cultural significance of each instrument.

## Features
- QR code integration for accessing instrument details and sounds.
- Web pages with descriptions, cultural significance, and audio players for each instrument.
- Multi-sensory experience enhancing both visual and auditory engagement.

## Setup and Installation

### Prerequisites:
Before you begin, ensure you have the following installed on your machine:

- Node.js: Download and install from Node.js official website.
- npm (Node Package Manager): Comes with Node.js installation.
- Vite: For a faster build tool and development server. 
- Appwrite
- Git: Download and install from Git official website.

## Architecture
Tribal Tunes uses a modular and scalable architecture to ensure optimal performance and flexibility. The main components include:
### Frontend
- Library: React
Component-based architecture for building the user interface.

- Styling: Tailwind CSS
Utility-first CSS classes for rapid UI development.

### Backend
- Framework: Node.js with Express
RESTful APIs for handling requests from the frontend.

- Authentication: Appwrite Authentication
Secure user login and registration.

- Storage: Appwrite Storage
Storing audio files and other media.

- Database: Appwrite Database
NoSQL database for storing metadata about musical instruments.

### Database
- Type: NoSQL (Appwrite Database)
Flexible and scalable for handling unstructured data.

- Collections:
Instruments: Documents with instrument details.
Admin: Admin information for managing and updating the website.

### Integration and Communication

- QR Code Integration:
Unique QR codes for each instrument's webpage.
- Audio Processing:
High-quality audio files stored in Appwrite Storage.

### Deployment
- Platform: Vercel
Seamless deployment for frontend and backend services.


