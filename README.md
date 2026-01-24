# Professional DevOps & Cloud Architect Portfolio

This is a Node.js-based portfolio website for **Nicolae Andrei-Gabriel**, a Senior DevOps Engineer and Cloud Architect. It showcases professional experience, technical skills, projects, and services, serving as a central hub for professional identity and client contact.

## 🚀 Features

*   **Responsive Single-Page Design:** A modern, fully responsive layout containing Home, About, Skills, Experience, Portfolio, Solutions, and Contact sections.
*   **Contact Form Integration:** A functional contact form that sends emails directly to the owner using `Nodemailer` via SMTP.
*   **Dynamic Resume Download:** Direct link to download the professional CV.
*   **Portfolio Showcase:** Categorized display of projects (Youtube, Vimeo, Soundcloud, etc.) with filtering capabilities.
*   **Service Offerings:** clear presentation of services like Infrastructure Design, CI/CD Automation, AI Integration, and Full-Stack Development.
*   **Social Integration:** Links to LinkedIn, GitHub, and other social platforms.

## 🛠️ Tech Stack

*   **Backend:** Node.js, Express.js
*   **Email Service:** Nodemailer (SMTP configuration)
*   **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
*   **Styling:** Custom CSS with FontAwesome icons
*   **Hosting Compatibility:** Optimized for standard Node.js hosting environments (including cPanel integration via `.cpanel.yml`).

## 📂 Project Structure

```text
E:\STUDIO\NIAN26\nian-mainPrj\
├── app.js                  # Main application entry point (Server & Routes)
├── package.json            # Project dependencies and scripts
├── public/                 # Static assets
│   ├── css/                # Stylesheets
│   ├── js/                 # Client-side scripts
│   └── ...                 # Images and other assets
├── views/                  # HTML templates
│   └── index.html          # Main single-page application view
├── .cpanel.yml             # cPanel deployment configuration
└── .gitignore              # Git ignore rules
```

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd nian-mainPrj
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configuration:**
    *   Open `app.js`.
    *   Locate the `nodemailer.createTransport` configuration.
    *   Ensure the SMTP settings (`host`, `port`, `auth`) are correct for your mail server.
    *   *Note: Sensitive credentials currently exist directly in `app.js`. It is recommended to move these to environment variables (`.env`) for security.*

4.  **Run the application:**
    ```bash
    npm start
    ```
    The server will start on port `3000` (or the port defined in `process.env.PORT`).

5.  **Access the site:**
    Open your browser and navigate to `http://localhost:3000`.

## 📧 Email Configuration

The application uses **Nodemailer** to handle form submissions. The current configuration is set up for `mail.nian.ro` on port `465` (SSL).

**Endpoint:** `POST /send-email`
**Payload:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "phone": "1234567890",
  "subject": "Inquiry",
  "message": "Hello..."
}
```

## 👤 Author

**Nicolae Andrei-Gabriel**
*   **Role:** Cloud Infrastructure Architect & DevOps Engineer
*   **Location:** Craiova, Romania
*   **Focus:** AWS, Kubernetes, Rancher, AI Integration
